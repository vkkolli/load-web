import { Base } from './base';
import { PricingType } from './pricing_type';
import { PricingLineItem } from './pricing_line_item';
import { PricingLineItemType } from './pricing_line_item_type';
import { AccessorialType } from './accessorial_type ';

export class Pricing extends Base {
  pricingLineItemValue: number;
  pricingLineItemSubtotal: number = 0.00;
  pricingType: PricingType;
  pricingLineItem: PricingLineItem;
  pricingLineItemType: PricingLineItemType;
  accessorialTypes?: AccessorialType;
  minimum?: number;
  lhPercentCalcValue?: number;

  constructor(pricingLineItemValue: number, pricingLineItemSubtotal: number,
    pricingType: PricingType, pricingLineItem: PricingLineItem, pricingLineItemType: PricingLineItemType,
    accessorialTypes?: AccessorialType, minimum?: number, lhPercentCalcValue?: number) {
    super();
    this.pricingLineItemValue = pricingLineItemValue;
    this.pricingLineItemSubtotal = pricingLineItemSubtotal;
    this.pricingType = pricingType;
    this.pricingLineItem = pricingLineItem;
    this.pricingLineItemType = pricingLineItemType;
    this.accessorialTypes = accessorialTypes;
    this.minimum = minimum;
    this.lhPercentCalcValue = lhPercentCalcValue;
  }
}
