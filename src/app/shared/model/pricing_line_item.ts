import { IdBase } from './idBase';

export class PricingLineItem extends IdBase{
  name?: string;
 
  constructor (id:string) {
    super();
    this.id = parseInt(id);
  }

}