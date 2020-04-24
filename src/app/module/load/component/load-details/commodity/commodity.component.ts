import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
})
export class CommodityComponent implements OnInit {

  @Input() loadForm : FormGroup;

  constructor(private fb: FormBuilder, config: NgbAccordionConfig, private router: Router) {
    config.type = 'dark';
  }

  ngOnInit(): void {
  }

  addCommodity() {
    this.loadCommodity.push(this.fb.group({
      id: [''],
      commodityName: ['', Validators.required],
      commodityWeight: [''],
      commodityLength: [''],
      commodityValue: ['']
    }));
  }

  get formControls() { return this.loadForm.controls; }

  get loadCommodity() { return this.formControls.commodity as FormArray; }

}
