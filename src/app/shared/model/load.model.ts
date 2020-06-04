import { Base } from './base';

export class LoadBoard extends Base {
    loadId: number;
    age: string;
    equipmentName: string;
    equipmentDesc: string;
    equipmentLength: string;
    equipmentWeight: string;
    loadType: string;
    loadStatus: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    mileage: number;
    originCsz: string;
    pickupDate: string;
    destinationCsz: string;
    deliveryDate: string;
    commodityName: string;
    commodityWeight: number;
    commodityLength: number;
    commodityValue: number;
    revenueCost: number;
    carrier: string;
    carrierContact: string;
    carrierPhone: string;
    carrierEmail: string;
    carrierAddress: string;
    actualPickupDate: string;
    actualDeliveryDate: string;
    isConfirmPickupEnable: boolean;
    isConfirmDeliveryEnable: boolean;
    totalRecords: number;

    public modelMapper(formData: any) {
        Object.assign(this, {
            loadId: formData["loadId"],
            age: formData["age"],
            equipmentName: formData["equipmentName"],
            loadType: formData["loadType"],
            loadStatus: formData["loadStatus"],
            companyName: formData["customerName"],
            contactEmail: formData["contactEmail"],
            mileage: formData["mileage"],
            originCSZ: formData["originCSZ"],
            pickupDate: formData["pickupDate"],
            destinationCSZ: formData["destinationCSZ"],
            deliveryDate: formData["deliveryDate"],
            commodityName: formData["commodityName"],
            weight: formData["weight"] ? formData["weight"] + "Lbs" : 0,
            length: formData["length"] ? formData["length"] + "Lbs" : 0,
            revenueRate: formData["revenueRate"],
            carrier: formData["carrierName"],
            actualPickupDate: formData["actualPickupDate"],
            actualDeliveryDate: formData["actualDeliveryDate"],
        });
        return this;
    };
}
