import { Component, Injector, OnInit } from "@angular/core";
import { LoadBoard } from "@app/shared/model/load.model";
import { LoadBoardParameters } from "@app/shared/model/params/load-board-parameters";
import { LoadBoardService } from "@app/shared/service/load-board.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"],
})
export class LoadBoardComponent implements OnInit {
  loads: LoadBoard[];
  loadSearch: LoadBoardParameters;
  editing = {};

  columns = [
    { name: "Age", prop: "age", width: "80" },
    { name: "Truck", prop: "equipmentName", width: "70" },
    { name: "F/P", prop: "loadType", width: "50", maxWidth: "50" },
    { name: "Status", prop: "loadStatus", width: "80" },
    { name: "Origin", prop: "originCsz", width: "185" },
    { name: "Trip", prop: "mileage", width: "60" },
    { name: "Destination", prop: "destinationCsz", width: "185" },
    { name: "Company", prop: "customerName", width: "135" },
    { name: "Cost", prop: "revenueCost", width: "70" },
  ];

  errorMessage: string;
  spinner: NgxSpinnerService;
  toastr: ToastrService;

  constructor(
    injector: Injector,
    private loadBoardService: LoadBoardService
  ) {
    this.spinner = injector.get(NgxSpinnerService);
  }

  ngOnInit(): void {
    this.loadBoardService.getLoads().subscribe(
      (loads: LoadBoard[]) => {
        this.loads = loads;
        this.spinner.hide();
      },
      (error: any) => {
        this.errorMessage = <any>error;
        this.spinner.hide();
      }
    );
  }
}
