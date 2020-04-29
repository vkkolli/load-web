import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadService } from '@app/module/load/component/load-details/shared/service/load.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  // @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent;

  @Input() headerText: string;
  @Input() isEdit: boolean;
  public isCollapsed = true;
  protected spinner: NgxSpinnerService;
  protected toastr: ToastrService;
  private routeSub: Subscription;

  @Input() loadFormValid : boolean;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(injector: Injector,private http: HttpClient, private fb: FormBuilder,
    config: NgbAccordionConfig, private loadService: LoadService, private router: Router, private route: ActivatedRoute) {
    // config.type = 'dark';
    this.spinner = injector.get(NgxSpinnerService);
    this.toastr = injector.get(ToastrService);
  }

  ngOnInit(): void {
  }

  sideMenuToggle() {
    // this.sideNavService.toggle();
  }


}
