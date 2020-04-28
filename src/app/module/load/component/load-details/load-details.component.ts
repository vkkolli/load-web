import { Component, OnInit, ChangeDetectionStrategy, Injector, Input } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadService } from './shared/service/load.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { PricingConstants } from '@app/shared/types/constants';

import { Trip } from '@app/shared/enum/trip.enum';
import { Observable, Subscription } from 'rxjs';
import { Load } from '@app/shared/model/load';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-load-details",
  templateUrl: "./load-details.component.html",
  styleUrls: ["./load-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbAccordionConfig]
})
export class LoadDetailsComponent implements OnInit {
  activeIds = [];

  protected spinner: NgxSpinnerService;
  protected toastr: ToastrService;
  private routeSub: Subscription;

  @Input() loadForm : FormGroup;

  constructor(injector: Injector,private http: HttpClient, private fb: FormBuilder,
    config: NgbAccordionConfig, private loadService: LoadService, private router: Router, private route: ActivatedRoute) {
    // config.type = 'dark';
    this.spinner = injector.get(NgxSpinnerService);
    this.toastr = injector.get(ToastrService);
  }

  ngOnInit(): void {

    this.activeIds = ['customer','equip','trip', 'pricing'];

  }


}
