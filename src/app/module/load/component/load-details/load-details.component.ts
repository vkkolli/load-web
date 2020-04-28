import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoadService } from './shared/service/load.service';


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

    this.activeIds = ['customer','equip','trip', 'pricing', 'carrier', 'load_carrier'];

  }


}
