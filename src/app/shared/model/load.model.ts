export class LoadBoard {
    loadId: number;
    age: string;
    equipmentName: string;
    loadType: string;
    loadStatus: string;
    customerName: string;
    customerEmail: string;
    mileage: number;
    originCsz: string;
    pickupDate: string;
    destinationCsz: string;
    deliveryDate: string;
    commodityName: string;
    commodityWeight: number;
    commodityLength: number;
    revenueCost: number;
    carrier: string;
    actualPickupDate: string;
    actualDeliveryDate: string;

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