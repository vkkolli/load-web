import { AgmCoreModule } from '@agm/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { AppCommonModule } from '@app/shared/module/common/app-common.module';
import { LoadBoardService } from '@app/shared/service/load-board.service';
import { NgbAccordionModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadCriteriaComponent } from "./component/load-criteria/load-criteria.component";
import { CarrierComponent } from './component/load-details/carrier/carrier.component';
import { CommodityComponent } from './component/load-details/commodity/commodity.component';
import { CustomerComponent } from './component/load-details/customer/customer.component';
import { EquipmentComponent } from './component/load-details/equipment/equipment.component';
import { LoadCarrierComponent } from './component/load-details/load-carrier/load-carrier.component';
import { LoadDetailsComponent } from "./component/load-details/load-details.component";
import { LoadStatusComponent } from './component/load-details/load-status/load-status.component';
import { PricingComponent } from './component/load-details/pricing/pricing.component';
import { CustomerService } from './component/load-details/shared/service/customer.service';
import { LoadService } from './component/load-details/shared/service/load.service';
import { TripComponent } from './component/load-details/trip/trip.component';
import { LoadTableComponent } from "./component/load-table/load-table.component";
import { CreateLoadComponent } from "./container/create-load/create-load.component";
import { LoadBoardComponent } from "./container/load-board/load-board.component";
import { LoadComponent } from "./container/load/load.component";
import { LoadRoutingModule } from "./load-routing.module";
import { CarrierService } from './service/carrier.service';
import { FormsModule } from '@angular/forms';





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
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    PortalModule,
    ScrollingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyD-XqQu8wb1NSuDOkpOT-6n39IroPkHQ48'
    })
  ],
  providers: [
    LoadService,
    CustomerService,
    CarrierService,
    LoadBoardService
  ]
})
export class LoadModule {}
