import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  ViewChild,
  Injector,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { ThemePalette } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { LoadBoardService } from "@app/shared/service/load-board.service";
import { PickupDeliveryDates } from "@app/shared/model/pickup-delivery-dates";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { LoadBoard } from "@app/shared/model/load.model";
import { fromEvent } from "rxjs";
import { debounceTime, takeWhile } from "rxjs/operators";
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-load-table",
  templateUrl: "./load-table.component.html",
  styleUrls: ["./load-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("myTable") table: any;

  @ViewChild("picker") picker: any;

  public isFilterFlyout = true;

  protected spinner: NgxSpinnerService;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = "primary";
  totalElements = 0;
  pageNumber = 0;
  pageSize = 10;
  data: LoadBoard[] = [];
  isAlive = true;
  tableWidth = 1340;
  showTable = true;
  selected = [];
  dateString = "";
  timeString = "";
  PageResultsCount = "10";

  searchForm: FormGroup;
  dateForm = new FormGroup({
    timeCtrl: new FormControl(new Date().getTime()),
    dateCtrl: new FormControl(this.ngbCalendar.getToday()),
  });

  /*timeCtrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }
    // if (value.hour < 12) {
    //   return {tooEarly: true};
    // }
    // if (value.hour > 13) {
    //   return {tooLate: true};
    // }
    return null;
  });*/

  @Input() rows: LoadBoard[];
  @Input() columns;
  windowResizeEvent = fromEvent(window, "resize").pipe(
    debounceTime(400),
    takeWhile(() => this.isAlive)
  );

  pickupDateEditing = {};
  deliveryDateEditing = {};

  public isPickupButtonVisible: boolean = true;
  
  ColumnMode =
    window.innerWidth < this.tableWidth
      ? ColumnMode.standard
      : ColumnMode.force;

  SelectionType = SelectionType;
  
  constructor(
    injector: Injector,
    private loadBoardService: LoadBoardService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private ngbCalendar: NgbCalendar,
  ) {
    this.spinner = injector.get(NgxSpinnerService);
    this.windowResizeEvent.subscribe((event) => {
      this.ColumnMode =
        window.innerWidth < this.tableWidth
          ? ColumnMode.standard
          : ColumnMode.force;
          this.showTable = false;
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {
        this.showTable = true;
        this.data = [...this.data];
        this.columns = [...this.columns];
        this.changeDetectorRef.detectChanges();
      }, 10);
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.isAlive = false;
  }

  setPage(page) {

    if (page.offset != undefined) {
      this.pageNumber = page.offset + 1;
    }
    this.loadBoardService.getLoads("" + this.pageNumber, this.PageResultsCount).subscribe(data => {
      this.data = data;
    })
  }

  getResults(page) {
    this.setPage(page);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows && changes.rows.currentValue) {

      this.totalElements = this.rows[0].totalRecords;
      this.data = this.rows?.slice(0, this.pageSize) ?? [];
    }
  }

  toggleExpandRow(row) {
    console.log("Toggled Expand Row!", row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  filterFlyout() {
    this.isFilterFlyout = !this.isFilterFlyout;
  }

  getStatusClass(row){
    var classList='';
    if(row.loadStatus == 'Posted'){
      classList = 'load-pickedup'; 
    }else if (row.loadStatus == 'Delivered'){
      classList = 'load-delivered';
    }else if (row.loadStatus == 'In Transit'){
      classList = 'load-intransit';    
    }else if (row.loadStatus == 'Carrier Assigned/Pending Pickup'){
      classList = 'load-assigned';
    }else if (row.loadStatus == 'Cancelled'){
      classList = 'load-cancelled';
    }
    return classList;
  }

  getRowClass(row) {
    return {
      // 'is-header-row': row.age % 10 === 0
      // 'is-header-row': row.loadId === 30000003
    };
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  isBarSelected = false;

  onActivate(event) {
    // console.log('Activate Event', event);
    if(event.type == 'click') {
    this.isBarSelected = true;
    console.log(this.isBarSelected);
    }
  }

  /*updatePickupDate(event, cell, rowIndex) {
    this.spinner.show();
    this.pickupDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event : event.target.value;
    const format = "yyyy-MM-dd, HH:mm:ss";
    const locale = "en-US";
    const formattedDate = formatDate(val, format, locale);
    this.rows[rowIndex].actualPickupDate = formattedDate;
    const pickupDeliveryDates = new PickupDeliveryDates();
    pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
    pickupDeliveryDates.tripType = "ORGIN";
    pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(", ")[0];
    pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(", ")[1];
    this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
      (loaddata) => {
        this.data[rowIndex] = loaddata;
        this.data = [...this.data];
        this.spinner.hide();
        this.toastr.success("Pickup Date Confirmed ...");
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error("Pickup Confirmation Error ...");
      }
    );
  }

  updateDeliveryDate(event, cell, rowIndex) {
    this.deliveryDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event : event.target.value;
    const format = "yyyy-MM-dd, HH:mm:ss";
    const locale = "en-US";
    const formattedDate = formatDate(val, format, locale);
    this.spinner.show();
    this.rows[rowIndex].actualDeliveryDate = formattedDate;
    const pickupDeliveryDates = new PickupDeliveryDates();
    pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
    pickupDeliveryDates.tripType = "DESTINATION";
    pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(", ")[0];
    pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(", ")[1];
    this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
    (loaddata) => {
      this.data[rowIndex] = loaddata;
      this.data = [...this.data];
      this.spinner.hide();
      this.toastr.success("Delivery Date Confirmed ...");
    },
    (error) => {
      this.spinner.hide();
      this.toastr.error("Delivery Confirmation Error ...");
    }
  );
}*/
updatePickupDate(cell, rowIndex) {
  this.spinner.show();
  this.pickupDateEditing[rowIndex] = false;
  var date = this.dateForm.get('dateCtrl').value;
  if (date) {
    this.dateString = (date.month + '/' + date.day + '/' + date.year);
  }
  var time = this.dateForm.get('timeCtrl').value;
  if (time) {
    this.timeString = (time.hour + ':' + time.minute + ':' + time.second);
  }
  var val = this.dateString +' '+ this.timeString;
  const format = "yyyy-MM-dd, HH:mm:ss";
  const locale = "en-US";
  const formattedDate = formatDate(val, format, locale);
  this.rows[rowIndex].actualPickupDate = formattedDate;
  const pickupDeliveryDates = new PickupDeliveryDates();
  pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
  pickupDeliveryDates.tripType = "ORGIN";
  pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(", ")[0];
  pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(", ")[1];
  this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
    (loaddata) => {
      this.data[rowIndex] = loaddata;
      this.data = [...this.data];
      this.spinner.hide();
      this.toastr.success("Pickup Date Confirmed ...");
    },
    (error) => {
      this.spinner.hide();
      this.toastr.error("Pickup Confirmation Error ...");
    }
  );
}

updateDeliveryDate(cell, rowIndex) {
  this.deliveryDateEditing[rowIndex] = false;
  var date = this.dateForm.get('dateCtrl').value;
    if (date) {
      this.dateString = (date.month + '/' + date.day + '/' + date.year);
    }
    var time = this.dateForm.get('timeCtrl').value;
    if (time) {
      this.timeString = (time.hour + ':' + time.minute + ':' + time.second);
    }
  var val = this.dateString +' '+ this.timeString;
  const format = "yyyy-MM-dd, HH:mm:ss";
  const locale = "en-US";
  const formattedDate = formatDate(val, format, locale);
  console.log('formattedDate formattedDate '+formattedDate);
  this.spinner.show();
  this.rows[rowIndex].actualDeliveryDate = formattedDate;
  const pickupDeliveryDates = new PickupDeliveryDates();
  pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
  pickupDeliveryDates.tripType = "DESTINATION";
  pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(", ")[0];
  pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(", ")[1];
  this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
  (loaddata) => {
    this.data[rowIndex] = loaddata;
    this.data = [...this.data];
    this.spinner.hide();
    this.toastr.success("Delivery Date Confirmed ...");
  },
  (error) => {
    this.spinner.hide();
    this.toastr.error("Delivery Confirmation Error ...");
  }
);
}

onClickOK(dp : String){
  alert('Clicked ok' + dp);
}

}
