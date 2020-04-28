import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '@app/shared/enum/trip.enum';
import { Load } from '@app/shared/model/load';
import { PricingConstants } from '@app/shared/types/constants';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { LoadService } from '../../component/load-details/shared/service/load.service';

@Component({
  templateUrl: './create-load.component.html',
  styleUrls: ['./create-load.component.scss']
})
export class CreateLoadComponent implements OnInit {
  protected spinner: NgxSpinnerService;
  protected toastr: ToastrService;
  private routeSub: Subscription;

  constructor(injector: Injector, private fb: FormBuilder,
    config: NgbAccordionConfig, private loadService: LoadService, private router: Router, private route: ActivatedRoute) {
    // config.type = 'dark';
    this.spinner = injector.get(NgxSpinnerService);
    this.toastr = injector.get(ToastrService);
  }

  load$: Observable<Load>;
  loadForm: FormGroup;

  ngOnInit(): void {

    this.createLoadForm();
    this.addCommodity();
    this.addPricing(PricingConstants.PRICING_TYPE_REVENUE);
    this.addPricing(PricingConstants.PRICING_TYPE_COST);
    this.addTrip(Trip.ORGIN);
    this.addTrip(Trip.DESTINATION);

    if (this.router.url.includes('/load/edit/')) {
      this.routeSub = this.route.params.subscribe(params => {
        this.getLoadById(params['id']);
      });
    }

  }

  createLoadForm() {
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
  }

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

  get formControls() { return this.loadForm.controls; }

  get loadTrips() { return this.formControls.loadTrips as FormArray; }

  get loadPricings() { return this.formControls.loadPricings as FormArray; }

  get loadCommodity() { return this.formControls.commodity as FormArray; }

  public getLoadById(loadId: number) {
    this.spinner.show();
    this.loadService.fetchByIsd(loadId).subscribe(
      data => {
        this.objectFormMapper(data);
        this.modifyFormObjects();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Not a Valid Load');
      })
  }

  objectFormMapper(data: Load) {
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
  }

  modifyFormObjects() {
    this.loadForm.get('customer.customerObj').setValue(this.loadForm.get('customer').value);
    this.loadTrips.controls.forEach(trip => {
      if (trip.get('expectedTripDate').value != null && trip.get('expectedTripDate').value != '') {
        let date = trip.get('expectedTripDate').value.split('/');
        let dateObj = {day: parseInt(date[1]), month: parseInt(date[0]), year: parseInt(date[2])};
        trip.get('expectedTripDateObj').setValue(dateObj);
      }
      if (trip.get('expectedTripTime').value != null && trip.get('expectedTripTime').value != '') {
        let timer = trip.get('expectedTripTime').value.split(':');
        let timerObj = {hour: parseInt(timer[0]), minute: parseInt(timer[1]), second: parseInt(timer[2])};
        trip.get('expectedTripTimeObj').setValue(timerObj);
      }
      trip.get('cityStateZip').setValue(trip.get('city').value +',' + trip.get('stateAbbr').value+','+ trip.get('zipCode').value);
    });
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
    }
    var time = trip.get('expectedTripTimeObj').value;
    if (time) {
      trip.get('expectedTripTime').setValue(time.hour + ':' + time.minute + ':' + time.second);
    }
  }

}
