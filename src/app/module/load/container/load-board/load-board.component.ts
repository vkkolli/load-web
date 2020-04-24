import { Component, OnInit } from "@angular/core";
import { LoadBoardService } from '@app/shared/service/load-board.service';
import { LoadBoard } from '@app/shared/model/load.model';


@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"]
})
export class LoadBoardComponent implements OnInit {
  loads: LoadBoard[];
  columns = [
    { name: "LoadId", prop: "loadId", width:'40'},
    { name: "Age", prop: "age", width:'60'},
    { name: "Truck", prop: "equipmentName", width:'100'},
    { name: "F/P", prop: "loadType",width:'30' },
    { name: "Status", prop: "loadStatus",width:'100' },
    { name: "Origin", prop: "originCsz",width:'100' },
    { name: "Trip", prop: "mileage",width:'30' },
    { name: "Destination", prop: "destinationCsz",width:'100' },
    { name: "Company", prop: "customerName" ,width:'100'},
    { name: "Commodity", prop: "commodityName",width:'100' },
    { name: "Cost", prop: "revenueCost" ,width:'60'},
    { name: "Carrier", prop: "carrierName" ,width:'60'},
    { name: "Actual Pickup", prop: "actualPickupDate" ,width:'70'},
    { name: "Actual Delivery", prop: "actualDeliveryDate",width:'70' }
  ];


  errorMessage: string;
  public quickSearchState: boolean = false;

  constructor(private loadBoardService: LoadBoardService) {}

  ngOnInit(): void {

    this.loadBoardService.getLoads().subscribe(
      (loads: LoadBoard[]) => {
          this.loads = loads;
      },
      (error: any) => this.errorMessage = <any>error
    );

  }

  quickSearch() {
    this.quickSearchState =  !this.quickSearchState;
  }
}
