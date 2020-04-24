import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';
import { ORIGIN, DESTINATION } from '@app/shared/types/constants';
import { LoadService } from '../shared/service/load.service';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from '@app/shared/enum/trip.enum';

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
      .pipe(map(list => list.length < 2 ? [] : (list.length > 10 ? list.splice(0, 10) : list)));
    })
  );

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

  selectedTripItem(item, index) {
    this.loadTrips.controls[index].get('city').setValue(item.item.split(',')[0].trim());
    this.loadTrips.controls[index].get('stateAbbr').setValue(item.item.split(',')[1].trim());
    this.loadTrips.controls[index].get('zipCode').setValue(item.item.split(',')[2].trim());
    if (this.loadTrips.controls[0].get('zipCode').value != '' && this.loadTrips.controls[1].get('zipCode').value != '') {
      this.loadService.calculateMileage((this.loadTrips.controls[0].get('zipCode').value).trim(),
      (this.loadTrips.controls[1].get('zipCode').value).trim()).subscribe(response => {
        this.loadForm.get('tripMileage').setValue(response.rows[0].elements[0].distance.text);
      },
      error => {
        this.loadForm.get('tripMileage').setValue(330.50);
      })
    }
  }

}
