import { Pricing } from './pricing';

export class LoadPricing {
    totalCost : number;
    totalRevenue : number;
    customerAvailableCredit : number;
    mileage : number;
    actualWeight : number;
    pricingAdjustments : Pricing;

    constructor(totalCost : number, totalRevenue : number, customerAvailableCredit : number, mileage : number,
         actualWeight : number, pricingAdjustments : Pricing) {
        this.totalCost = totalCost;
        this.totalRevenue = totalRevenue;
        this.customerAvailableCredit = customerAvailableCredit;
        this.mileage = mileage;
        this.actualWeight = actualWeight;
        this.pricingAdjustments = pricingAdjustments;
      }
}
