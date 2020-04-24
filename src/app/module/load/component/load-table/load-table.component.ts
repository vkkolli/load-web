import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';

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

  ColumnMode = ColumnMode;
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
}
