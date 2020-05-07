import { Address } from './address';
import { Base } from './base';
import { Carrier } from './carrier';
import { Commodity } from './commodity';
import { Customer } from './customer';
import { Equipment } from './equipment';
import { LoadStatus } from './load-status';
import { Pricing } from './pricing';
import { Trip } from './trip';

export class Load extends Base{
  loadDescription: string;
  customer: Customer;
  customerAddress: Address;
  loadStatus: LoadStatus;
  carrier: Carrier;
  equipment: Equipment;
  totalRevenue: number;
  totalCost: number;
  maxRate: number;
  targetRate: number;
  loadSize: string;
  tripMileage: number;
  loadPricings: Pricing[];
  commodity: Commodity;
  loadTrips: Trip[];
  length: number;
  weight: number;
}
