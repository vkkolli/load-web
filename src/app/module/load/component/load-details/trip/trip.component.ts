import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() loadForm : FormGroup;
  zipSearchList: Observable<Array<String>>;

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

  constructor(private fb: FormBuilder, private lookupService: LookupService) { }

  ngOnInit() {
    this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  onValueChanges(): void {
  }


  selectedOriginItem(item) {
  }

  selectedDestinationItem(item) {
  }

  get name() { return this.loadForm.get('name'); }

}
