import { Component, OnInit } from "@angular/core";
import { LoadBoardService } from 'src/app/shared/service/load-board.service';
import { LoadBoard } from 'src/app/shared/model/load.model';


@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"]
})
export class LoadBoardComponent implements OnInit {
  loads: LoadBoard[];
  columns = [
    { name: "LoadId", prop: "loadId" },
    { name: "Age", prop: "age" },
    { name: "Truck", prop: "equipmentName" },
    { name: "F/P", prop: "loadType" },
    { name: "Status", prop: "loadStatus" },
    { name: "Origin", prop: "originCsz" },
    { name: "Trip", prop: "mileage" },
    { name: "Destination", prop: "destinationCsz" },
    { name: "Pickup", prop: "pickupDate" },
    { name: "Delivery", prop: "deliveryDate" },
    { name: "Company", prop: "customerName" },
    { name: "Contact", prop: "customerEmail" },
    { name: "Commodity", prop: "commodityName" },
    { name: "Length", prop: "commodityLength" },
    { name: "Weight", prop: "commodityWeight" },
    { name: "Cost", prop: "revenueCost" },
    { name: "Carrier", prop: "carrierName" },
    { name: "Actual Pickup", prop: "actualPickupDate" },
    { name: "Actual Delivery", prop: "actualDeliveryDate" }
  ];
  errorMessage: string;

  constructor(private loadBoardService: LoadBoardService) {}

  ngOnInit(): void {
    this.loadBoardService.getLoads().subscribe(
      (loads: LoadBoard[]) => {
          this.loads = loads;
      },
      (error: any) => this.errorMessage = <any>error
  );
  }
}
