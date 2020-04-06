import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"]
})
export class LoadBoardComponent implements OnInit {
  rows = [
    {
      "loadId":"30000001",
      "age":"4 Days",
      "equipmentName":"Reefer",
      "loadType":"F",
      "loadStatus":"Shipment Planning",
      "companyName":"ABC Trucking Inc",
      "contactEmail": "abc-inc@logistics.com",
      "mileage":"123.4",
      "originCSZ":"MCHENRY, IL, 60050",
      "pickupDate": "01/01/2020",
      "destinationCSZ":"NY CITY, NY, 10004",
      "deliveryDate": "01/31/2020",
      "commodityName":"ABC",
      "weight":"123 Lbs",
      "length":"456 Lbs",
      "revenueRate":"456.00",
      "carrier":"ABC Carrier",
      "actualPickupDate": "01/01/2020 07:00:00",
      "actualDeliveryDate": "01/31/2020 14:00:00"
      },
      {
      "loadId":"30000002",
      "age":"3 Months",
      "equipmentName":"Van",
      "loadType":"P",
      "loadStatus":"Tendered",
      "companyName":"XYZ Trucking Inc",
      "contactEmail": "xyz-inc@logistics.com",
      "mileage":"234.5",
      "originCSZ":"BROOKLYN, NY, 11239",
      "pickupDate": "02/01/2020",
      "destinationCSZ":"AURORA, CO, 80011",
      "deliveryDate": "02/28/2020",
      "commodityName":"XYZ",
      "weight":"234 Lbs",
      "length":"567 Lbs",
      "revenueRate":"567.00",
      "carrier":"XYZ Carrier",
      "actualPickupDate": "02/01/2020 08:00:00",
      "actualDeliveryDate": "02/28/2020 16:00:00"
      },
      {
      "loadId":"30000003",
      "age":"12 Hours",
      "equipmentName":"Air Freight",
      "loadType":"F",
      "loadStatus":"Pending Pickup",
      "companyName":"PQR Trucking Inc",
      "contactEmail": "pqr-inc@logistics.com",
      "mileage":"567.8",
      "originCSZ":"ATLANTA, GA, 30310",
      "pickupDate": "03/01/2020",
      "destinationCSZ":"AURORA, CO, 80011",
      "deliveryDate": "03/30/2020",
      "commodityName":"PQR",
      "weight":"890 Lbs",
      "length":"246 Lbs",
      "revenueRate":"135.00",
      "carrier":"PQR Carrier",
      "actualPickupDate": "03/01/2020 09:00:00",
      "actualDeliveryDate": "03/30/2020 18:00:00"
      }
  ];
  columns = [
    { name: "LoadId", prop: "loadId" },
    { name: "Age", prop: "age" },
    { name: "Truck", prop: "equipmentName" },
    { name: "F/P", prop: "loadType" },
    { name: "Status", prop: "loadStatus" },
    { name: "Origin", prop: "originCSZ" },
    { name: "Trip", prop: "mileage" },
    { name: "Destination", prop: "destinationCSZ" },
    { name: "Pickup", prop: "pickupDate" },
    { name: "Delivery", prop: "deliveryDate" },
    { name: "Company", prop: "companyName" },
    { name: "Contact", prop: "contactEmail" },
    { name: "Length", prop: "length" },
    { name: "Weight", prop: "weight" },
    { name: "Rate", prop: "revenueRate" }
  ];
  constructor() {}

  ngOnInit(): void {}
}
