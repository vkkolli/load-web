import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-load-table',
  templateUrl: './load-table.component.html',
  styleUrls: ['./load-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadTableComponent implements OnInit {

  @Input() rows;
  @Input() columns;

  ColumnMode = ColumnMode;
  constructor() { }

  ngOnInit(): void {
  }

}
