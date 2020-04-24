import { Component, OnInit, Input } from '@angular/core';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LookupService } from '@app/module/load/service/lookup.service';
import { LoadService } from '../shared/service/load.service';
import { CustomerService } from '../shared/service/customer.service';
import { Address } from '@app/shared/model/address';

const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Input() loadForm : FormGroup;
    activeIds = [];
  ColumnMode = ColumnMode;

  SelectionType = SelectionType;

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
  customerAddressList: Address[];

  constructor(private fb: FormBuilder, config: NgbAccordionConfig, private router: Router,
    private lookupService: LookupService, private customerService: CustomerService) {
    config.type = 'dark';
  }

  ngOnInit(): void {
    this.activeIds = ['customer'];
    this.onChanges();
  }

  onChanges(): void {
    this.loadForm.get('customer.id').valueChanges.subscribe(customerId => {
      this.customerService.getCustomerAddress(customerId).subscribe(response => {
        this.customerAddressList = response;
      })
    });
  }

  selectedCustomer (customer) {
    // this.loadForm.get('customer').setValue(customer.item);
    this.loadForm.get('customer.id').setValue(customer.item.id);
    this.loadForm.get('customer.company').setValue(customer.item.company);
    this.loadForm.get('customer.customerEmail').setValue(customer.item.customerEmail);
    this.loadForm.get('customer.active').setValue(customer.item.active);
    if (customer) {
      this.customerService.getCustomerAddress(customer.item.id).subscribe(response => {
          this.customerAddressList = response;
        })
    }
  }

  get formControls() { return this.loadForm.controls; }

  get customerAddress() { return this.formControls.customerAddress as FormGroup; }

  populateContact (addressIndex) {
    this.customerAddress.get('contactPerson').setValue(this.customerAddressList[addressIndex-1].contactPerson);
    this.customerAddress.get('emailId').setValue(this.customerAddressList[addressIndex-1].emailId);
    this.customerAddress.get('phoneNo').setValue(this.customerAddressList[addressIndex-1].phoneNo);
  }

}
