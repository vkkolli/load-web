import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CarrierService } from '@app/module/load/service/carrier.service';
import { AssignCarrier } from '@app/shared/model/assign-carrier';
import { Carrier } from '@app/shared/model/carrier';
import { Load } from '@app/shared/model/load';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-load-carrier',
  templateUrl: './load-carrier.component.html',
  styleUrls: ['./load-carrier.component.scss']
})
export class LoadCarrierComponent implements OnInit {

  @Input() loadForm: FormGroup;
  ColumnMode = ColumnMode.force;
  carrier = new Array<Carrier>();

  columns = [
    { name: "Name", prop: "carrierName" },
    { name: "City / State / Zip", prop: "city" },
    { name: "Contact Name", prop: "carrierContact" },
    { name: "Contact Email", prop: "emailId" },
    { name: "Contact Phone", prop: "phone" },
    { name: "Actions", prop: "actions" }
  ];

  protected spinner: NgxSpinnerService;
  protected toastr: ToastrService;

  constructor(injector: Injector, private carrierService: CarrierService) {

    this.spinner = injector.get(NgxSpinnerService);
     }


  ngOnInit(): void {
    let carrier = new Carrier();
    carrier = this.loadForm.get('carrier').value;
    carrier.actions = 'remove';
    this.carrier.push(carrier);
    // this.onChanges();
  }

  unAssignCarrier () {
    this.spinner.show()
    const assignCarrier = new AssignCarrier();
    assignCarrier.loadId = this.loadForm.get('id').value;
    assignCarrier.carrierId = this.carrier[0].id;
    assignCarrier.assigned = false;
    this.carrierService.assignCarrier(assignCarrier).subscribe(
      data => {
        this.objectFormMapper(data);
        this.modifyFormObjects();
        this.spinner.hide();
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
      tripMileage: data.tripMileage
    });
    if (data.carrier != null) {
      this.loadForm.patchValue({
        carrier: data.carrier
      })
    }
    else {
      let carrier = new Carrier();
      carrier.id = null;
      this.loadForm.patchValue({
        carrier: carrier
      })
    }
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

  get formControls() { return this.loadForm.controls; }

  get loadTrips() { return this.formControls.loadTrips as FormArray; }

}
