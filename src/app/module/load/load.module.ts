import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadRoutingModule } from "./load-routing.module";
import { LoadComponent } from "./container/load/load.component";
import { AppCommonModule } from "src/app/shared/module/common/app-common.module";
import { LoadBoardComponent } from "./container/load-board/load-board.component";
import { CreateLoadComponent } from "./container/create-load/create-load.component";
import { LoadTableComponent } from "./component/load-table/load-table.component";
import { LoadDetailsComponent } from "./component/load-details/load-details.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadCriteriaComponent } from "./component/load-criteria/load-criteria.component";

@NgModule({
  declarations: [
    LoadComponent,
    LoadBoardComponent,
    CreateLoadComponent,
    LoadTableComponent,
    LoadDetailsComponent,
    LoadCriteriaComponent
  ],
  imports: [
    CommonModule,
    LoadRoutingModule,
    AppCommonModule,
    NgxDatatableModule
  ]
})
export class LoadModule {}
