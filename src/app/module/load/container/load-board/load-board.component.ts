import { Component, OnInit } from "@angular/core";
import { LoadBoardService } from '@app/shared/service/load-board.service';
import { LoadBoard } from '@app/shared/model/load.model';


@Component({
  templateUrl: "./load-board.component.html",
  styleUrls: ["./load-board.component.scss"]
})
export class LoadBoardComponent implements OnInit {
  loads: LoadBoard[];
  columns = [];
  editing = {};

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
