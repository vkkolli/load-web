import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';
import { ORIGIN, DESTINATION } from '@app/shared/types/constants';
import { Distance } from '@app/shared/model/distance';
import { RepositoryService } from '@app/core/services/repository.service';
import { LoadService } from '../shared/service/load.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() loadForm : FormGroup;
  zipSearchList: Observable<Array<String>>;
  time: any;
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
  API_KEY: string = 'js-QrAd6KG8tmif88Uza5DzCGhWkWte1HvuKKmVyyXaQmtORuheLWXiV2k3ODxaa501';

  constructor(private fb: FormBuilder, private lookupService: LookupService, private loadService: LoadService, private repo: RepositoryService) { }

  ngOnInit() {

    this.addTrip(ORIGIN);
    this.addTrip(DESTINATION);
    this.onValueChanges();
  }

  formatTime (index, timer) {
    if (timer) {
      this.loadTrips.controls[index].get('expectedTripTime').setValue(timer.hour + ':' + timer.minute + ':' + timer.second);
    }
  }

  formatDate (date, index) {
    if (date) {
      this.loadTrips.controls[index].get('expectedTripDate').setValue(date.month + '/' + date.day + '/' + date.year);
    }
  }

  get formControls() { return this.loadForm.controls; }

  get loadTrips() { return this.formControls.loadTrips as FormArray; }

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

  calculateMileage(origin: number, dest: number): Observable<Distance> {
    return this.repo.get<Distance>('https://www.zipcodeapi.com/rest/' + this.API_KEY + '/distance.json/' + origin + '/' + dest + '/mile');
  }

  onValueChanges(): void {
  }

  selectedTripItem(item, index) {
    this.loadTrips.controls[index].get('city').setValue(item.item.split(',')[0]);
    this.loadTrips.controls[index].get('stateAbbr').setValue(item.item.split(',')[1]);
    this.loadTrips.controls[index].get('zipCode').setValue(item.item.split(',')[2]);
    if (this.loadTrips.controls[0].get('zipCode').value != '' && this.loadTrips.controls[1].get('zipCode').value != '') {
      this.calculateMileage((this.loadTrips.controls[0].get('zipCode').value).trim(),
      (this.loadTrips.controls[1].get('zipCode').value).trim()).subscribe(response => {
        this.loadForm.get('tripMileage').setValue(response.distance);
      })
    }
  }

}
