import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LookupService } from '@app/module/load/service/lookup.service';
import { Address } from '@app/shared/model/address';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
import { CustomerService } from '../shared/service/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Input() loadForm : FormGroup;
  activeIds = [];

  searchCustomer = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(term => {
      if (!term) {
        return of([]);
      }

      return this.lookupService
        .fetchCustDetails(term)
        .pipe(map(list => (list.length > 10 ? list.splice(0, 10) : list)))
    })
  );

  formatter = (x: {company: string}) => x.company;
  customerAddressList: Observable<Array<Address>>;

  constructor(private fb: FormBuilder, config: NgbAccordionConfig, private router: Router,
    private lookupService: LookupService, private customerService: CustomerService) {
    config.type = 'dark';
  }

  ngOnInit(): void {
    this.activeIds = ['customer'];
    this.onChanges();
  }

  onChanges(): void {
    if(this.loadForm.get('customerAddress.emailId').invalid) {
      this.loadForm.get('customer.id').valueChanges.subscribe(customerId => {
        this.customerAddressList = this.customerService.getCustomerAddress(customerId).pipe(shareReplay());
      });
    }
  }

  selectedCustomer (customer) {
    this.loadForm.get('customer.id').setValue(customer.item.id);
    this.loadForm.get('customer.company').setValue(customer.item.company);
    this.loadForm.get('customer.customerEmail').setValue(customer.item.customerEmail);
    this.loadForm.get('customer.active').setValue(customer.item.active);
    if (customer) {
      this.customerAddressList = this.customerService.getCustomerAddress(customer.item.id).pipe(shareReplay());
    }
  }

  get formControls() { return this.loadForm.controls; }

  get customerAddress() { return this.formControls.customerAddress as FormGroup; }

  populateContact (addressIndex) {
    this.customerAddressList.subscribe(data => {
      data.forEach(element => {
        if (element.id == this.loadForm.get('customerAddress.id').value) {
          this.customerAddress.get('contactPerson').setValue(element.contactPerson);
          this.customerAddress.get('emailId').setValue(element.emailId);
          this.customerAddress.get('phoneNo').setValue(element.phoneNo);
        }
      });
    });
  }

}
