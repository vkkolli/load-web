import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';
import { LoadService } from '../shared/service/load.service';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from '@app/shared/enum/trip.enum';
// import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() loadForm : FormGroup;
  zipSearchList: Observable<Array<String>>;
  time: NgbTimeStruct;
  date: any;
  // directionsService = new google.maps.DirectionsService();

  searchCityStateZip = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(searchText => {
      if (searchText.length < 3 ) {
        return of([]);
      }
      return this.lookupService.fetchCityStateZip(searchText)
      .pipe(map(list => list.length < 2 ? [] : (list.length > 10 ? list.splice(0, 10) : list)));
    })
  );
  originLocation: any;
  destLocation: any;

  constructor(private fb: FormBuilder, private lookupService: LookupService, private loadService: LoadService) { }

  ngOnInit() {

    this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  get loadTrips() { return this.formControls.loadTrips as FormArray; }

  get tripEnum() { return Trip; }

  addTrip(tripType: number) {
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

  onValueChanges(): void {
  }

  selectedTripItem(tripObj, index, csz) {
    if (tripObj.get('tripType').value == 0) {
      this.originLocation = tripObj.value;
    } else {
      this.destLocation = tripObj.value;
    }

    this.loadTrips.controls[index].get('city').setValue(csz.item.split(',')[0].trim());
    this.loadTrips.controls[index].get('stateAbbr').setValue(csz.item.split(',')[1].trim());
    this.loadTrips.controls[index].get('zipCode').setValue(csz.item.split(',')[2].trim());

    if (this.loadTrips.controls[0].get('zipCode').value != '' && this.loadTrips.controls[1].get('zipCode').value != '') {
      this.loadService.calculateMileage((this.loadTrips.controls[0].get('zipCode').value).trim(),
      (this.loadTrips.controls[1].get('zipCode').value).trim()).subscribe(response => {
        this.loadForm.get('tripMileage').setValue(response.rows[0].elements[0].distance.text);
      },
      error => {
        this.loadForm.get('tripMileage').setValue(1330.50);
      })
    }
  }

//   findMilleage (){

//     if (this.originLocation && this.destLocation) {
//         let request = {
//             origin: this.originLocation,
//             destination: this.destLocation,
//             optimizeWaypoints: true,
//             travelMode: google.maps.DirectionsTravelMode.DRIVING
//         };

//         this.directionsService.route(request, function (response, status) {
//             if (status == google.maps.DirectionsStatus.OK) {

//                 let legs = response.routes[0].legs;
//                 let tripDistance = 0;
//                 for (let i = 0; i < legs.length; i++) {
//                     tripDistance = tripDistance + legs[i].distance.value;
//                 }
//                 // Do not calculate the mileage if the load is EDI and there is Mileage But Do Calculate when the Origin or destination changes
//                 this.loadForm.tripMileage = (tripDistance * 0.000621371192).toFixed(2);;
//                 // this.$apply();
//             }
//         });
//     }
// };


}
