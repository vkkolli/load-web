import { IdBase } from './idBase';

export class PricingLineItemType extends IdBase{
  name?: string;

  constructor (id:string) {
    super();
    this.id = parseInt(id);
  }
}