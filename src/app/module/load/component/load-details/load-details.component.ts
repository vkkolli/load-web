import { Component, OnInit, ChangeDetectionStrategy, Injector } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadService } from './shared/service/load.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

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

  constructor(injector: Injector,private http: HttpClient, private fb: FormBuilder, config: NgbAccordionConfig, private loadService: LoadService, private router: Router) {
    config.type = 'dark';
    this.spinner = injector.get(NgxSpinnerService);
    console.log(this.router.url);
  }

  loadForm: FormGroup;

  ngOnInit(): void {

    this.loadForm = this.fb.group({
      customer: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required],
        phone: ['']
      }),
      equipment: this.fb.group({
        type: ['', Validators.required],
        load_size: ['', Validators.required],
        length: [''],
        weight: ['']
      }),
      commodity: this.fb.group({
        name: ['', Validators.required],
        weight: [''],
        value: ['']
      }),
      origin: this.fb.group({
        name: ['', Validators.required],
        cityStateZip: [''],
        pickup_date: [''],
        pickup_time: [''],
        notes: ['']
      }),
      destination: this.fb.group({
        name: ['', Validators.required],
        cityStateZip: [''],
        delivery_date: [''],
        delivery_time: [''],
        notes: ['']
      }),
      pricing: this.fb.group({
        target: ['', Validators.required],
        max: [''],
        revenue: [''],
        rev_value: [''],
        rev_total: [''],
        cost: [''],
        cost_value: [''],
        cost_total: ['']
      }),
      carrier: this.fb.group({
        carrier_search: ['']
      })
    });

    if (this.router.url.includes('/load/edit/')) {
      this.getJSON().subscribe(
        data => {
          this.loadForm.patchValue({
            customer: data.customer,
            equipment: data.equipment,
            commodity: data.commodity,
            origin: data.origin,
            destination: data.destination,
            pricing: data.pricing,
            carrier: data.carrier
          });
        },
        error => {
          console.log(error);
        })
    }
    this.activeIds = ['customer','equip','trip', 'pricing'];
  }

  get formControls() { return this.loadForm.controls; }

  private _jsonURL = 'assets/data/sample.json';
  public getJSON(): Observable<any> {
    this.loadService.fetchById(1233);
    return this.http.get(this._jsonURL);
  }

  saveOrUpdate() {
    this.spinner.show();
    this.loadService.saveOrUpdate(this.loadForm.value);
  }
}
