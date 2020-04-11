import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
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
    this.activeIds = ['trip', 'pricing'];
  }

  tripFormChangeEvent (tripFormGroup: FormGroup) {
    this.loadForm.addControl('origin',tripFormGroup);
  }

  get formControls() { return this.loadForm.controls; }

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

  saveOrUpdate() {
    // stop here if form is invalid
    // if (this.loadForm.invalid) {
    //   alert("Form Invalid...!");
    //   return;
    // }

    this.createLoadService.createLoad(this.loadForm.value)
      .subscribe(data => {
        if (data["success"]) {
          alert("Load Created Successfuly..!")
          this.router.navigate(['../']);
        }
      });
  }
}
