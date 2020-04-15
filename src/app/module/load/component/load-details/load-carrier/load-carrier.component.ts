import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-load-carrier',
  templateUrl: './load-carrier.component.html',
  styleUrls: ['./load-carrier.component.scss']
})
export class LoadCarrierComponent implements OnInit {

  @Input() loadForm: FormGroup;
  ColumnMode = ColumnMode;
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
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
