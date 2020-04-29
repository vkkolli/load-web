import { IdBase } from './idBase';

export class PickupDeliveryDates  extends IdBase{
  loadId: number;
  tripType: string;
  pickupOrDeliveryDate: string;
  pickupOrDeliveryTime: string;
}