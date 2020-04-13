import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

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

  constructor() { }

  ngOnInit(): void {
  }

}
