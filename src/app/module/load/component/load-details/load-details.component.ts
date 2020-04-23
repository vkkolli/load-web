import { Component, OnInit, ChangeDetectionStrategy, Injector } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoadService } from './shared/service/load.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-load-details",
  templateUrl: "./load-details.component.html",
  styleUrls: ["./load-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbAccordionConfig]
})
export class LoadDetailsComponent implements OnInit {
  activeIds = [];

  protected spinner: NgxSpinnerService;

  constructor(injector: Injector,private http: HttpClient, private fb: FormBuilder, config: NgbAccordionConfig, private loadService: LoadService, private router: Router) {
    this.spinner = injector.get(NgxSpinnerService);
    console.log(this.router.url);
  }

  loadForm: FormGroup;

  ngOnInit(): void {

    this.loadForm = this.fb.group({
      loadStatus: this.fb.group({
        id: [''],
        loadStatusName: [''],
        description: ['']
      }),
      customer: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        address: ['', Validators.required],
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required],
        phone: ['']
      }),
      equipment: this.fb.group({
        id: [''],
        type: ['', Validators.required],
        load_size: ['', Validators.required],
        length: [''],
        weight: ['']
      }),
      commodity: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        weight: [''],
        value: ['']
      }),
      loadTrips: new FormArray([]),
      loadPricings: new FormArray([]),
      carrier: this.fb.group({
        id: [''],
        carrier_search: ['']
      }),
      totalRevenue: [''],
      totalCost: [''],
      maxRate: [''],
      tripMileage:[''],
      targetRate: ['']
    });

    this.activeIds = ['customer','equip','trip', 'pricing'];
  }
  get formControls() { return this.loadForm.controls; }

  saveOrUpdate() {
    this.spinner.show();
    this.loadService.saveOrUpdate(this.loadForm.value);
  }
}
