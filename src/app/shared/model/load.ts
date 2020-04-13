import { Base } from './base';

export class Load extends Base{
  loadId: number;
  loadDescription: string;
  customer_id: number;
  customer_address_id: number;

  loadStatus_id: number;
  sales_rep_id: number;
  carrier_id: number;
  equipment_id: number;
  total_revenue: number;
  total_cost: number;
  max_rate: number;
  target_rate: number;
  load_size: string;
  trip_mileage: number;
}
