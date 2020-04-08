import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
const searchList= ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];
@Component({
  selector: "app-load-details",
  templateUrl: "./load-details.component.html",
  styleUrls: ["./load-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbAccordionConfig]
})
export class LoadDetailsComponent implements OnInit {
  activeIds = [];
  ColumnMode = ColumnMode;
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
  SelectionType = SelectionType;
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : searchList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  constructor(private fb: FormBuilder, config: NgbAccordionConfig) {
    config.type = 'dark';
  }

  ngOnInit(): void {
    this.activeIds = ['customer', 'equip', 'commodity', 'trip', 'pricing', 'carrier', 'load_carrier'];
  }
  loadForm = this.fb.group({
    customer: this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact_name: [{value: '', disabled: true}, Validators.required],
      contact_email: [{value: '', disabled: true}, Validators.required],
      phone: [{value: '', disabled: true}]
    }),    
    equipment: this.fb.group({
      type: ['', Validators.required],
      load_size: ['', Validators.required],
      length: [''],
      weight: ['']
    }),    
    commodity: this.fb.group({
      name: ['', Validators.required],
      weight: [''],
      value: ['']
    }),    
    origin: this.fb.group({
      name: ['', Validators.required],
      cityStateZip: [''],
      pickup_date: [''],
      pickup_time: [''],
      notes: ['']
    }),    
    destination: this.fb.group({
      name: ['', Validators.required],
      cityStateZip: [''],
      delivery_date: [''],
      delivery_time: [''],
      notes: ['']
    }),    
    pricing: this.fb.group({
      target: ['', Validators.required],
      max: [''],
      revenue: [''],
      rev_value: [''],
      rev_total: [{value: '', disabled: true}],
      cost: [''],
      cost_value: [''],
      cost_total: [{value: '', disabled: true}]
    }),
    carrier: this.fb.group({
      carrier_search: ['']
    })
  });
}
