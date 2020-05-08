import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ThemePalette } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { EventEmitter } from 'protractor';
import { LoadBoardService } from '@app/shared/service/load-board.service';
import { PickupDeliveryDates } from '@app/shared/model/pickup-delivery-dates';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-load-table',
  templateUrl: './load-table.component.html',
  styleUrls: ['./load-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadTableComponent implements OnInit {

  @ViewChild('myTable') table: any;

  @ViewChild('picker') picker: any;

  protected spinner: NgxSpinnerService;


  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

 

  @Input() rows;
  @Input() columns;

  pickupDateEditing = {};
  deliveryDateEditing = {};

  public isPickupButtonVisible: boolean = true;

  ColumnMode = ColumnMode.standard;
  constructor(injector: Injector,private loadBoardService: LoadBoardService, private toastr: ToastrService) {
    this.spinner = injector.get(NgxSpinnerService);
   }

  ngOnInit(): void {
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getRowClass(row) {
    return {
      // 'is-header-row': row.age % 10 === 0
      // 'is-header-row': row.loadId === 30000003
    };
  }

  updatePickupDate(event, cell, rowIndex) {
    this.spinner.show();
    this.pickupDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event : event.target.value;
    const format = 'yyyy-MM-dd, HH:mm:ss';
    const locale = 'en-US';
    const formattedDate = formatDate(val, format, locale);
    this.rows[rowIndex].actualPickupDate = formattedDate;
    const pickupDeliveryDates = new PickupDeliveryDates();
    pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
    pickupDeliveryDates.tripType='ORGIN';
    pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(', ')[0];
    pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(', ')[1];
    this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
      data => {
        this.rows[rowIndex]=data;
        this.rows = [...this.rows];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Pickup Confirmation Error ...');
      }
      );
  }

  updateDeliveryDate(event, cell, rowIndex) {
    this.spinner.show();
    this.deliveryDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event : event.target.value;
    const format = 'yyyy-MM-dd, HH:mm:ss';
    const locale = 'en-US';
    const formattedDate = formatDate(val, format, locale);
    var result = this.checkforValidation(this.rows[rowIndex].actualPickupDate, formattedDate);
    if(result) {
      this.rows[rowIndex].actualDeliveryDate = formattedDate;
      const pickupDeliveryDates = new PickupDeliveryDates();
      pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
      pickupDeliveryDates.tripType='DESTINATION';
      pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(', ')[0];
      pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(', ')[1];
      this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
        data => {
          this.rows[rowIndex]=data;
          this.rows = [...this.rows];
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Delivery Confirmation Error ...');
        }
        );
    } else {
        this.toastr.error('Delivery date cannot be prior to Pickup date');
    }
  }

  checkforValidation(pickup, delivery) : boolean{
    if(delivery > pickup)
       return true;
    else 
        return false;
  }
}

