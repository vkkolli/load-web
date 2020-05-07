import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadBoard } from '@app/shared/model/load.model';
import { LoadBoardParameters } from '@app/shared/model/params/load-board-parameters';
import { LoadBoardService } from '@app/shared/service/load-board.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { LookupService } from '../../service/lookup.service';


@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"]
})
export class LoadBoardComponent implements OnInit {
  loads: LoadBoard[];
  loadSearch: LoadBoardParameters;
  editing = {};

  columns = [
    { name: "Age", prop: "age", width:'80'},
    { name: "Truck", prop: "equipmentName", width:'70'},
    { name: "F/P", prop: "loadType",width:'50' },
    { name: "Status", prop: "loadStatus",width:'80' },
    { name: "Origin", prop: "originCsz",width:'185' },
    { name: "Trip", prop: "mileage",width:'60' },
    { name: "Destination", prop: "destinationCsz",width:'185' },
    { name: "Company", prop: "customerName" ,width:'135'},
    { name: "Cost", prop: "revenueCost" ,width:'70'},
  ];

  errorMessage: string;
  public quickSearchState: boolean = false;
  searchForm: FormGroup;
  spinner: NgxSpinnerService;
  toastr: ToastrService;

  constructor(injector: Injector,
    private loadBoardService: LoadBoardService,
    private fb: FormBuilder, private lookupService: LookupService) {
    this.spinner = injector.get(NgxSpinnerService);

  }

  ngOnInit(): void {
    this.createSerchForm();
    this.loadBoardService.getLoads().subscribe(
      (loads: LoadBoard[]) => {
          this.loads = loads;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  quickSearch() {
    this.quickSearchState =  !this.quickSearchState;
  }

  searchLoads(){
    this.spinner.show();
    if (this.searchForm.get('customerObj').value == '') {
      this.searchForm.get('customerId').setValue(null);
    }

    this.loadBoardService.getLoadSearch(this.searchForm.value).subscribe(
      data => {
          this.loads = data;
          this.quickSearch();
          this.spinner.hide();
          if (data.length == 0) {
            this.toastr.info("No Loads found in such criteria");
          }
      },
      error => {
        this.spinner.hide();
        this.toastr.error("Load Search Failed");
      }

    );
  }

  createSerchForm () {
    this.searchForm = this.fb.group({
      loadId: [''],
      customerId: [''],
      customerObj: [''],
      equipmentId: [''],
      originCsz: ['',[Validators.required, Validators.pattern('^(.+)[,\\s]+(.+?)\s*(\d{5})?$')]],
      destinationCsz:['',[Validators.required, Validators.pattern('^(.+)[,\\s]+(.+?)\s*(\d{5})?$')]]
    });
  }

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


  searchCustomer = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(500),
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

  selectedCustomer (customer) {
    this.searchForm.get('customerId').setValue(customer.item.id);
  }
}
