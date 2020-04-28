import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadRoutingModule } from "./load-routing.module";
import { LoadComponent } from "./container/load/load.component";
import { LoadBoardComponent } from "./container/load-board/load-board.component";
import { CreateLoadComponent } from "./container/create-load/create-load.component";
import { LoadTableComponent } from "./component/load-table/load-table.component";
import { LoadDetailsComponent } from "./component/load-details/load-details.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { LoadCriteriaComponent } from "./component/load-criteria/load-criteria.component";
import { NgbAccordionModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './component/load-details/customer/customer.component';
import { EquipmentComponent } from './component/load-details/equipment/equipment.component';
import { LoadStatusComponent } from './component/load-details/load-status/load-status.component';
import { CommodityComponent } from './component/load-details/commodity/commodity.component';
import { TripComponent } from './component/load-details/trip/trip.component';
import { PricingComponent } from './component/load-details/pricing/pricing.component';
import { CarrierComponent } from './component/load-details/carrier/carrier.component';
import { LoadCarrierComponent } from './component/load-details/load-carrier/load-carrier.component';
import { AppCommonModule } from '@app/shared/module/common/app-common.module';
import { LoadService } from './component/load-details/shared/service/load.service';
import { LoadBoardService } from '@app/shared/service/load-board.service';
import { NumericDirective } from '@app/core/directives/numeric.directive';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomerService } from './component/load-details/shared/service/customer.service';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { AgmCoreModule } from '@agm/core';


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
    CarrierComponent,
    LoadCarrierComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    LoadRoutingModule,
    AppCommonModule,
    NgxDatatableModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    NgbModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyD-XqQu8wb1NSuDOkpOT-6n39IroPkHQ48'
    })
  ],
  providers: [
    LoadService,
    CustomerService,
    LoadBoardService
  ]
})
export class LoadModule {}
