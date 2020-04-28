import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ThemePalette } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-load-table',
  templateUrl: './load-table.component.html',
  styleUrls: ['./load-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadTableComponent implements OnInit {

  @ViewChild('myTable') table: any;

  @Input() rows;
  @Input() columns;

  @ViewChild('picker') picker: any;


  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  pickupDateEditing = {};
  deliveryDateEditing = {};

  ColumnMode = ColumnMode.standard;
  constructor() { }

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
    this.pickupDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event :event.target.value;
    const format = 'yyyy-MM-dd, HH:mm:ss';
    const locale = 'en-US';
    const formattedDate = formatDate(val, format, locale);
    this.rows[rowIndex].pickupDate = formattedDate;
  }

  updateDeliveryDate(event, cell, rowIndex) {
    this.deliveryDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event :event.target.value;
    const format = 'yyyy-MM-dd, HH:mm:ss';
    const locale = 'en-US';
    const formattedDate = formatDate(val, format, locale);
    this.rows[rowIndex].deliveryDate = formattedDate;
  }
}
