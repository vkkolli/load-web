import { Base } from './base';
import { Customer } from './customer';
import { LoadStatus } from './load-status';
import { Carrier } from './carrier';
import { Equipment } from './equipment';
import { Commodity } from './commodity';
import { Trip } from './trip';
import { Pricing } from './pricing';
import { Address } from './address';

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
}
