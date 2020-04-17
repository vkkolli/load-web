import { IdBase } from './idBase';

export class Pricing  extends IdBase{
  pricingTypeId: number;
  pricingLineItem: number;
  pricingLineItemValue: number;
  pricingLineItemSubtotal: number;
}
