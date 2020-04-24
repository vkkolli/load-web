import { IdBase } from './idBase';

export class PricingType extends IdBase{
  name?: string;

  constructor (id:string) {
    super();
    this.id = parseInt(id);
  }

}