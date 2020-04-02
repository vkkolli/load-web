import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-load-search',
  templateUrl: './load-search.component.html',
  styleUrls: ['./load-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
