import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { LookupService } from '@app/module/load/service/lookup.service';
import { Carrier } from '@app/shared/model/carrier';
import { LoadService } from '../shared/service/load.service';

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
    { name: "Name", prop: "name" },
    { name: "City / State / Zip", prop: "cityStateZip" },
    { name: "Contact Name", prop: "contact_name" },
    { name: "Contact Email", prop: "contact_email" },
    { name: "Contact Phone", prop: "phone" }
  ];
  columns1 = [
    { name: "Name", prop: "name" },
    { name: "City / State / Zip", prop: "cityStateZip" },
    { name: "Contact Name", prop: "contact_name" },
    { name: "Contact Email", prop: "contact_email" },
    { name: "Contact Phone", prop: "phone" },
    { name: "Actions", prop: "actions" }
  ];
  rows = [
    { name: "ABC", cityStateZip: "New York, NY, 12345", contact_name: "XYZ", contact_email: "xyz@abc.com", phone: "(123) 456-7890", actions: "remove" },
    { name: "ABC", cityStateZip: "New York, NY, 12345", contact_name: "XYZ", contact_email: "xyz@abc.com", phone: "(123) 456-7890", actions: "remove" },
    { name: "ABC", cityStateZip: "New York, NY, 12345", contact_name: "XYZ", contact_email: "xyz@abc.com", phone: "(123) 456-7890", actions: "remove" },
    { name: "ABC", cityStateZip: "New York, NY, 12345", contact_name: "XYZ", contact_email: "xyz@abc.com", phone: "(123) 456-7890", actions: "remove" }
  ];

  carriers: Array<Carrier>;
  carrierForm: FormGroup;

  constructor(private fb: FormBuilder, private loadService: LoadService,private lookupService: LookupService) { }

  ngOnInit(): void {
    this.carrierForm = this.fb.group({
      carrier_search: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  searchCarriers () {
    this.lookupService.fetchCarrierDetails(this.carrierForm.get('carrier_search').value).subscribe(data => {
      this.carriers = data;
    });
  }

  selectedCarrier (customer) {
    // this.loadForm.get('customer').setValue(customer.item);

  }
}
