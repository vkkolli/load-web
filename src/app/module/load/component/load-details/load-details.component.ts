import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-load-details",
  templateUrl: "./load-details.component.html",
  styleUrls: ["./load-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbAccordionConfig]
})
export class LoadDetailsComponent implements OnInit {
  activeIds = [];
  constructor(private fb: FormBuilder, config: NgbAccordionConfig) {
    config.type = 'dark';
  }

  ngOnInit(): void {
    this.activeIds = ['customer', 'equip'];
  }
  loadForm = this.fb.group({
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
      weight: [''],
      width: ['']
    }),    
    commodity: this.fb.group({
      name: ['', Validators.required],
      weight: [''],
      value: ['']
    })
  });
}
