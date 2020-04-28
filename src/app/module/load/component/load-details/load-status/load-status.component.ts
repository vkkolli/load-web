import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';
import { LoadStatus } from '@app/shared/model/load-status';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load-status',
  templateUrl: './load-status.component.html',
  styleUrls: ['./load-status.component.scss']
})
export class LoadStatusComponent implements OnInit {

  @Input() loadForm : FormGroup;

  loadStatuses$: Observable<Array<LoadStatus>>;

  constructor(private lookupService: LookupService) { }

  ngOnInit(): void {
    this.loadStatuses$ = this.lookupService.loadStatuses$;
  }

}
