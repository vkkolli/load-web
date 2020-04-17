import { IdBase } from './idBase';

export class Carrier  extends IdBase{
  carrierName: string;
  equipment?: any;
  carrierContact: string;
  emailId: string;
  phone: string;
  city: string;
  stateAbbr: string;
  countryAbbr: string;
  zip: string;
  active: boolean;
}
