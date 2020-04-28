import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
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
