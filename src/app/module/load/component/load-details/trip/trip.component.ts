import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';
import { Trip } from '@app/shared/enum/trip.enum';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { LoadService } from '../shared/service/load.service';

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

  searchCityStateZip = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(searchText => {
      if (searchText.length < 3 ) {
        return of([]);
      }
      return this.lookupService.fetchCityStateZip(searchText)
      .pipe(map(list => list.length < 1 ? [] : (list.length > 10 ? list.splice(0, 10) : list)));
    })
  );
  originLocation: any;
  destLocation: any;

  constructor(private fb: FormBuilder, private lookupService: LookupService, private loadService: LoadService) { }

  ngOnInit() {

    // this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  get getMileage() { return this.loadForm.get('tripMileage').value; }

  get loadTrips() {
    // this.sortForm();
    return this.formControls.loadTrips as FormArray;
  }

  sortForm () {
    let trips =  this.loadForm.controls.loadTrips.value;
    const tripsEnum = ["ORGIN", "DESTINATION"];
    const orderedTrips = trips.sort((a, b) => tripsEnum.indexOf(a.tripType) - tripsEnum.indexOf(b.tripType));
    this.loadForm.controls.loadTrips.patchValue(orderedTrips)
  }

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

  // onValueChanges(): void {
  //   this.loadForm.get('cityStateZip').valueChanges.subscribe(val =>{
  //     let trips =  this.loadForm.controls.loadTrips.value;
  //     console.log(trips)
  //     trips.sort((a, b) => a.tripType < b.tripType)
  //     this.loadForm.controls.loadTrips.patchValue(trips)
  //   })
  // }

  selectedTripItem(tripObj, csz, index) {
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
        this.loadForm.get('tripMileage').setValue(parseInt(response.rows[0].elements[0].distance.text.split(' ')[0].replace (/,/g, "")));
      },
      error => {
        this.loadForm.get('tripMileage').setValue(1330.50);
      })
    }
  }
}
