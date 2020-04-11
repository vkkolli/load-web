import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  @Input() loadForm : FormGroup;
  // @Output() onFormGroupChange = new EventEmitter<FormGroup>();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : searchList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  onValueChanges(): void {
    this.loadForm.valueChanges.pipe( debounceTime(1000)).subscribe(val=>{
      console.log(val);
      //this.onFormGroupChange.emit(this.loadForm.value);
    })
  }

  get name() { return this.loadForm.get('name'); }

}
