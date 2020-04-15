import { Component, OnInit, Input } from '@angular/core';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LookupService } from '@app/module/load/service/lookup.service';

const searchList = ['Abc', 'Abcde', 'bcd', 'def', 'cde', 'xyz', 'qwerty', 'asdfg', 'poiuy', 'lkjhg', 'mnbv', 'jkl'];


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

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

    searchCustomer = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term) {
          return of([]);
        }
  
        return this.lookupService
          .fetchCustDetails(term)
          .pipe(map(list => (list.length > 10 ? list.splice(0, 10) : list)))
      })
    );

  formatter = (x: {company: string}) => x.company;

  constructor(private fb: FormBuilder, config: NgbAccordionConfig, private router: Router,private lookupService: LookupService) {
    config.type = 'dark';    
  }

  ngOnInit(): void {
    this.activeIds = ['customer'];
  }

}
