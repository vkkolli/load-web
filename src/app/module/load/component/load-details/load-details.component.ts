import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CreateLoadService } from './shared/service/create-load.service';
import { Router } from '@angular/router';
const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];
@Component({
  selector: "app-load-details",
  templateUrl: "./load-details.component.html",
  styleUrls: ["./load-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbAccordionConfig, CreateLoadService]
})
export class LoadDetailsComponent implements OnInit {
  activeIds = [];
  ColumnMode = ColumnMode;
  columns = [
    { name: "Name", prop: "name" },
    { name: "City / State / Zip", prop: "cityStateZip" },
    { name: "Contact Name", prop: "contact_name" },
    { name: "Contact Email", prop: "contact_email" },
    { name: "Contact Phone", prop: "phone" }
  ];
  rows = [
    {
      name: "ABC", cityStateZip: "New York, NY, 12345", contact_name: "XYZ", contact_email: "xyz@abc.com", phone: "(123) 456-7890"
    }
  ];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : searchList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  constructor(private fb: FormBuilder, config: NgbAccordionConfig, private createLoadService: CreateLoadService, private router: Router) {
    config.type = 'dark';
  }

  ngOnInit(): void {
    this.activeIds = ['customer', 'equip', 'commodity', 'trip', 'pricing', 'carrier', 'load_carrier'];
  }

  get formControls() { return this.loadForm.controls; }

  loadForm = this.fb.group({
    customer: this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact_name: ['', Validators.required],
      contact_email: ['', Validators.required],
      phone: ['']
    }),
    equipment: this.fb.group({
      type: ['', Validators.required],
      load_size: ['', Validators.required],
      length: [''],
      weight: [''],
      width: ['']
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
      notes: ['']
    }),
    destination: this.fb.group({
      name: ['', Validators.required],
      cityStateZip: [''],
      delivery_date: [''],
      notes: ['']
    }),
    pricing: this.fb.group({
      target: ['', Validators.required],
      max: [''],
      revenue: [''],
      rev_value: [''],
      cost: [''],
      cost_value: ['']
    }),
    carrier: this.fb.group({
      carrier_search: ['']
    })
  });

  onSubmit() {
    // stop here if form is invalid
    if (this.loadForm.invalid) {
      alert("Form Invalid...!");
      return;
    }

    this.createLoadService.createLoad(this.loadForm)
      .subscribe(data => {
        if (data["success"]) {
          alert("Load Created Successfuly..!")
          this.router.navigate(['../']);
        }
      });
  }
}
