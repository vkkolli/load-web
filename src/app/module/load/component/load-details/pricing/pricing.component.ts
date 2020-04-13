import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PricingLineItem } from '@app/shared/model/pricing_line_item';
import { LookupService } from '@app/module/load/service/lookup.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  @Input() loadForm : FormGroup;

  pricingLineItem$: Observable<Array<PricingLineItem>>;

  constructor(public lookupService: LookupService) { }

  ngOnInit() {
    this.pricingLineItem$ = this.lookupService.pricingLineItem$;

    this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  onValueChanges(): void {
    this.loadForm.get('pricing.revenue').valueChanges.pipe( debounceTime(100)).subscribe(val=>{
      if (val === 'FR' && val !== '') {
        this.loadForm.get('pricing.rev_total').setValue(this.loadForm.get('pricing.rev_value').value);
      }
      if (val === 'PM' && val !== '') {
        this.loadForm.get('pricing.rev_total').setValue(5 * this.loadForm.get('pricing.rev_value').value);
      }
    });
    this.loadForm.get('pricing.rev_value').valueChanges.pipe( debounceTime(100)).subscribe(val=>{
      if (this.loadForm.get('pricing.revenue').value === 'FR' && val !== '') {
        this.loadForm.get('pricing.rev_total').setValue(this.loadForm.get('pricing.rev_value').value);
      }
      if (this.loadForm.get('pricing.revenue').value === 'PM' && val !== '') {
        this.loadForm.get('pricing.rev_total').setValue(5 * this.loadForm.get('pricing.rev_value').value);
      }
    });
    this.loadForm.get('pricing.cost').valueChanges.pipe( debounceTime(100)).subscribe(val=>{
      if (val === 'FR' && val !== '') {
        this.loadForm.get('pricing.cost_total').setValue(this.loadForm.get('pricing.cost_value').value);
      }
      if (val === 'PM' && val !== '') {
        this.loadForm.get('pricing.cost_total').setValue(5 * this.loadForm.get('pricing.cost_value').value);
      }
    });
    this.loadForm.get('pricing.cost_value').valueChanges.pipe( debounceTime(100)).subscribe(val=>{
      if (this.loadForm.get('pricing.cost').value === 'FR' && val !== '') {
        this.loadForm.get('pricing.cost_total').setValue(this.loadForm.get('pricing.cost_value').value);
      }
      if (this.loadForm.get('pricing.cost').value === 'PM' && val !== '') {
        this.loadForm.get('pricing.cost_total').setValue(5 * this.loadForm.get('pricing.cost_value').value);
      }
    });

  }

}
