import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
// import { Observable, of } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { LookupService } from '@app/module/load/service/lookup.service';
import { Carrier } from '@app/shared/model/carrier';
import { LoadService } from '../shared/service/load.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss']
})
export class CarrierComponent implements OnInit {

  @Input() loadForm : FormGroup;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns = [
    { headerCheckboxable: false, checkboxable: true, width: "30" },
    { name: "Name", prop: "carrierName" },
    { name: "City / State / Zip", prop: "city" },
    { name: "Contact Name", prop: "carrierContact" },
    { name: "Contact Email", prop: "emailId" },
    { name: "Contact Phone", prop: "phone" }
  ];
  rows$ = [];

  carriers$: Observable<Array<Carrier>>;

  protected spinner: NgxSpinnerService;
  carrierForm: FormGroup;

  constructor(private fb: FormBuilder, private loadService: LoadService,private lookupService: LookupService) { }

  ngOnInit(): void {
    this.carrierForm = this.fb.group({
      carrier_search: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  searchCarriers () {
    this.carriers$ = this.lookupService.fetchCarrierDetails(this.carrierForm.get('carrier_search').value);
    // this.carriers$.subscribe();
  }

  selectedCarrier (customer) {
    // this.loadForm.get('customer').setValue(customer.item);

  }
}
