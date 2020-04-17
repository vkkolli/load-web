import { IdBase } from './idBase';

export class Customer  extends IdBase{
  company: string;
  customerEmail: string;
  active: boolean;
}
