import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';

const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() loadForm : FormGroup;

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(searchText => searchText.length < 2 ? []
  //       : this.zipSearchList = this.service.fetchAllCarrierDetails(searchText))
  //   );


  searchCityStateZip = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => {
      if (!term) {
        return of([]);
      }

      return this.lookupService
        .fetchCityStateZip(term)
        .pipe(map(list => (list.length > 10 ? list.splice(0, 10) : list)));
    })
  );

  zipSearchList: Observable<Array<String>>;
  constructor(private fb: FormBuilder, private lookupService: LookupService) { }

  ngOnInit() {
    this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  onValueChanges(): void {
  }

  get name() { return this.loadForm.get('name'); }

}
