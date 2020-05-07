import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrierService } from '@app/module/load/service/carrier.service';
// import { Observable, of } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { LookupService } from '@app/module/load/service/lookup.service';
import { AssignCarrier } from '@app/shared/model/assign-carrier';
import { Carrier } from '@app/shared/model/carrier';
import { Load } from '@app/shared/model/load';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
    { name: "Name", prop: "carrierName" },
    { name: "City / State / Zip", prop: "city" },
    { name: "Contact Name", prop: "carrierContact" },
    { name: "Contact Email", prop: "emailId" },
    { name: "Contact Phone", prop: "phone" }
  ];

  carriers$: Carrier[];

  protected spinner: NgxSpinnerService;
  protected toastr: ToastrService;
  carrierForm: FormGroup;
  disableAssign: boolean = true;
  selectedCarrier: Carrier;

  constructor(injector: Injector, private fb: FormBuilder, private loadService: LoadService,
    private lookupService: LookupService, private carrierService: CarrierService,private router: Router) {

    this.spinner = injector.get(NgxSpinnerService);
     }

  ngOnInit(): void {
    this.carrierForm = this.fb.group({
      carrier_search: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  searchCarriers () {
    this.spinner.show();
    this.lookupService.fetchCarrierDetails(this.carrierForm.get('carrier_search').value).subscribe(data => {
      this.carriers$ = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  get formControls() { return this.loadForm.controls; }

  get loadTrips() { return this.formControls.loadTrips as FormArray; }

  assignCarrier () {
    this.spinner.show()
    const assignCarrier = new AssignCarrier();
    assignCarrier.loadId = this.loadForm.get('id').value;
    assignCarrier.carrierId = this.selectedCarrier.id;
    assignCarrier.assigned = true;
    this.carrierService.assignCarrier(assignCarrier).subscribe(
      data => {
        this.objectFormMapper(data);
        this.modifyFormObjects();
        this.router.navigate(['/load']);
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Not a Valid Load');
      }
      );
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
      totalRevenue: data.totalRevenue,
      totalCost: data.totalCost,
      id: data.id,
      maxRate: data.maxRate,
      targetRate: data.targetRate,
      loadSize: data.loadSize,
      tripMileage: data.tripMileage,
      carrier: data.carrier
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

  onActivate (event) {
    const selected = event.event.target.checked;
    if (selected || event.type == 'click') {
      this.selectedCarrier = event.row;
      this.disableAssign = false;
    }
  }
}
