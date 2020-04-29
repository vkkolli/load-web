import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupService } from '@app/module/load/service/lookup.service';
import { PricingConstants } from '@app/shared/types/constants';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  @Input() loadForm : FormGroup;
  mileage: number = 6;

  // pricingLineItem$: Observable<Array<PricingLineItem>>;

  constructor(public lookupService: LookupService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.pricingLineItem$ = this.lookupService.pricingLineItem$;
    // this.onValueChanges();
  }

  get formControls() { return this.loadForm.controls; }

  get loadPricings() { return this.formControls.loadPricings as FormArray; }

  addPricing(priceType: number) {
    this.loadPricings.push(this.fb.group({
      id: [''],
      pricingTypeId: [priceType],
      pricingLineItem: [''],
      pricingLineItemValue: ['', Validators.required],
      pricingLineItemSubtotal: ['']
    }));
  }

  calculateTotal(pricingTypeId, index) {
    if (this.getControl(index, 'pricingLineItemValue') !== '' && this.getControl(index, 'pricingLineItem') !== '') {
      if (this.getControl(index, 'pricingLineItem') == PricingConstants.PRICING_CALC_TYPE_FLAT_RATE) {
        this.loadPricings.controls[index].get('pricingLineItemSubtotal')
        .setValue(this.getControl(index, 'pricingLineItemValue'));
      } else {
        this.loadPricings.controls[index].get('pricingLineItemSubtotal')
        .setValue(this.getControl(index, 'pricingLineItemValue') * this.loadForm.get('tripMileage').value);
      }
    }
    if (pricingTypeId.value == PricingConstants.PRICING_TYPE_REVENUE) {
      this.loadForm.get('totalRevenue').setValue(this.loadPricings.controls[index].get('pricingLineItemSubtotal').value);
    } else {
      this.loadForm.get('totalCost').setValue(this.loadPricings.controls[index].get('pricingLineItemSubtotal').value);
    }
  }

  getControl(index, key) {
    return this.loadPricings.controls[index].get(key).value
  }

  onValueChanges(): void {

  }

}
