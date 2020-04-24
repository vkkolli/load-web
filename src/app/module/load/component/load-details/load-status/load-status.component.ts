import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-load-status',
  templateUrl: './load-status.component.html',
  styleUrls: ['./load-status.component.scss']
})
export class LoadStatusComponent implements OnInit {

  @Input() loadForm : FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
