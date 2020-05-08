import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  @Input() loadForm : FormGroup;
  activeIds = [];
  ColumnMode = ColumnMode;
  
  SelectionType = SelectionType;
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : searchList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  constructor(private fb: FormBuilder, config: NgbAccordionConfig, private router: Router) {
    config.type = 'dark';
  }

  ngOnInit(): void {

  }

  get formControls() { return this.equipForm.controls; }

  equipForm = this.fb.group({
    
    equipment: this.fb.group({
      type: ['', Validators.required],
      load_size: ['', Validators.required],
      length: [''],
      weight: ['']
    }),
    commodity: this.fb.group({
      name: ['', Validators.required],
      weight: [''],
      value: ['']
    })
  });



}
