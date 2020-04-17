import { IdBase } from './idBase';

export class Address  extends IdBase{
  addressLine1: string;
  addressLine2: string;
  customer: number;
  city?: string;
  stateAbbr?: string;
  countryAbbr?: string;
  zipcode?: string;
  contactPerson: string;
  emailId: string;
  phoneNo: string;
}
