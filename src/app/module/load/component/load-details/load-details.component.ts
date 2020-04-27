import { Component, OnInit, ChangeDetectionStrategy, Injector } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadService } from './shared/service/load.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { PricingConstants } from '@app/shared/types/constants';

import { Trip } from '@app/shared/enum/trip.enum';
import { Observable, Subscription } from 'rxjs';
import { Load } from '@app/shared/model/load';
import { ToastrService } from 'ngx-toastr';

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
  protected toastr: ToastrService;
  private routeSub: Subscription;

  constructor(injector: Injector,private http: HttpClient, private fb: FormBuilder,
    config: NgbAccordionConfig, private loadService: LoadService, private router: Router, private route: ActivatedRoute) {
    // config.type = 'dark';
    this.spinner = injector.get(NgxSpinnerService);
    this.toastr = injector.get(ToastrService);
  }

  load$: Observable<Load>;
  loadForm: FormGroup;

  ngOnInit(): void {

    this.loadForm = this.fb.group({
      loadStatus: this.fb.group({
        id: [''],
        loadStatusName: [''],
        description: ['']
      }),
      customer: this.fb.group({
        id: ['', Validators.required],
        company: [''],
        customerObj: ['', Validators.required],
        customerEmail: [''],
        active: ['']
      }),
      customerAddress: this.fb.group({
        id: [''],
        addressLine1: [''],
        addressLine2: [''],

        city: [''],
        stateAbbr: [''],
        countryAbbr: ['USA'],
        zipCode: [''],
        contactPerson: ['', Validators.required],
        emailId: ['',[Validators.required, Validators.email]],
        phoneNo: ['']
      }),
      equipment: this.fb.group({
        id: ['', Validators.required],
        equipmentName: [''],
        equipmentDescription: [''],
        length: [''],
        weight: [''],
        active: ['']
      }),
      commodity: new FormArray([]),
      loadTrips: new FormArray([]),
      loadPricings: new FormArray([]),
      carrier: this.fb.group({
        id: [''],
        carrier_search: ['']
      }),
      totalRevenue: [''],
      totalCost: [''],
      maxRate: [''],
      loadSize: [''],
      tripMileage:[''],
      targetRate: ['']
    });
    this.addCommodity();
    this.addPricing(PricingConstants.PRICING_TYPE_REVENUE);
    this.addPricing(PricingConstants.PRICING_TYPE_COST);
    this.addTrip(Trip.ORGIN);
    this.addTrip(Trip.DESTINATION);
    this.activeIds = ['customer','equip','trip', 'pricing'];

    if (this.router.url.includes('/load/edit/')) {
      this.routeSub = this.route.params.subscribe(params => {
        this.getJSON(params['id']);
      });
    }

  }

  // private _jsonURL = 'assets/data/sample.json';
  public getJSON(loadId: number) {
    this.spinner.show();
    this.loadService.fetchByIsd(loadId).subscribe(
      data => {
        this.loadForm.patchValue({
          loadStatus: data.loadStatus,
          customer: data.customer,
          customerAddress: data.customerAddress,
          equipment: data.equipment,
          commodity: data.commodity,
          loadTrips: data.loadTrips,
          loadPricings: data.loadPricings,
          // totalRevenue: data.totalRevenue,
          // totalCost: data.totalCost,
          maxRate: data.maxRate,
          targetRate: data.targetRate,
          loadSize: data.loadSize,
          tripMileage: data.tripMileage,
          // carrier: data.carrier
        });
        this.loadForm.get('customer.customerObj').setValue(this.loadForm.get('customer').value);
        this.loadTrips.controls.forEach(trip => {//expectedTripTime
          if (trip.get('expectedTripDate') && trip.get('expectedTripDate').value != '') {
            let date = trip.get('expectedTripDate').value.split('/');
            let dateObj = {day: parseInt(date[1]), month: parseInt(date[0]), year: parseInt(date[2])};
            trip.get('expectedTripDateObj').setValue(dateObj);
          }
          if (trip.get('expectedTripTime') && trip.get('expectedTripTime').value != '') {
            let timer = trip.get('expectedTripTime').value.split(':');
            let timerObj = {hour: parseInt(timer[0]), minute: parseInt(timer[1]), second: parseInt(timer[2])};
            trip.get('expectedTripTimeObj').setValue(timerObj);
          }
          trip.get('cityStateZip').setValue(trip.get('city').value +',' + trip.get('stateAbbr').value+','+ trip.get('zipCode').value);
        });

      this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error('Not a Valid Load');
      })
    // return this.http.get(this._jsonURL);
  }

  get formControls() { return this.loadForm.controls; }

  get loadTrips() { return this.formControls.loadTrips as FormArray; }

  get loadPricings() { return this.formControls.loadPricings as FormArray; }

  get loadCommodity() { return this.formControls.commodity as FormArray; }

  addPricing(priceType: number) {
    this.loadPricings.push(this.fb.group({
      id: [''],
      pricingTypeId: [priceType],
      pricingLineItem: [''],
      pricingLineItemValue: ['', Validators.required],
      pricingLineItemSubtotal: ['', Validators.required]
    }));
  }

  addTrip(tripType) {
    this.loadTrips.push(this.fb.group({
      id: [''],
      tripType: [tripType],
      expectedTripDate: [''],
      expectedTripTime: [''],
      expectedTripDateObj: [''],
      expectedTripTimeObj: [''],
      actualTripDateObj: [''],
      actualTripDate: [''],
      actualTripTimeObj: [''],
      actualTripTime: [''],
      companyName: [''],
      city: ['', Validators.required],
      cityStateZip: ['', [Validators.required, Validators.pattern('^(.+)[,\\s]+(.+?)\s*(\d{5})?$')]],
      stateAbbr: ['', Validators.required],
      countryAbbr: ['USA'],
      zipCode: ['', Validators.required],
      tripNotes: [''],
      active: ['']
    }));
  }

  addCommodity() {
    this.loadCommodity.push(this.fb.group({
      id: [''],
      commodityName: ['', Validators.required],
      commodityWeight: [''],
      commodityLength: [''],
      commodityValue: ['']
    }));
  }

  saveOrUpdate() {
    this.spinner.show();
    if (this.loadForm.get('loadStatus.id').value == '' ) {
      this.loadForm.get('loadStatus.id').setValue(10);
    }
    this.updateDatesAndTimes();
    this.loadService.saveOrUpdate(this.loadForm.value);
  }

  updateDatesAndTimes() {
    this.loadTrips.controls.forEach(trip => {
      this.formatDateAndTime(trip);
    });
  }

  formatDateAndTime (trip) {
    let date = trip.get('expectedTripDateObj').value;

    if (date) {
      trip.get('expectedTripDate').setValue(date.month + '/' + date.day + '/' + date.year);
      // const momentDate = new Date(date); // Replace event.value with your date value
      // const formattedDate = moment(momentDate).format("MM/DD/YYYY");
      // trip.get('expectedTripDate').setValue(formattedDate);
    }
    var time = trip.get('expectedTripTimeObj').value;
    if (time) {
      trip.get('expectedTripTime').setValue(time.hour + ':' + time.minute + ':' + time.second);
    }
  }
}
