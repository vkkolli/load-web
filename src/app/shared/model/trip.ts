import { IdBase } from './idBase';

export class Trip extends IdBase{
  tripType?: any;
  expectedTripDate: string;
  expectedTripTime: string;
  actualTripDate: string;
  actualripTime: string;
  companyName: string;
  city: string;
  stateAbbr: string;
  countryAbbr: string;
  zipCode: string;
  tripNotes?: string;
  active: boolean;
}
