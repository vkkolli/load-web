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
import { CustomerComponent } from './component/load-details/customer/customer.component';
import { EquipmentComponent } from './component/load-details/equipment/equipment.component';
import { LoadStatusComponent } from './component/load-details/load-status/load-status.component';
import { CommodityComponent } from './component/load-details/commodity/commodity.component';
import { TripComponent } from './component/load-details/trip/trip.component';
import { PricingComponent } from './component/load-details/pricing/pricing.component';
import { CarrierComponent } from './component/load-details/carrier/carrier.component';

@NgModule({
  declarations: [
    LoadComponent,
    LoadBoardComponent,
    CreateLoadComponent,
    LoadTableComponent,
    LoadDetailsComponent,
    LoadCriteriaComponent,
    CustomerComponent,
    EquipmentComponent,
    LoadStatusComponent,
    CommodityComponent,
    TripComponent,
    PricingComponent,
    CarrierComponent
  ],
  imports: [
    CommonModule,
    LoadRoutingModule,
    AppCommonModule,
    NgxDatatableModule
  ]
})
export class LoadModule {}
