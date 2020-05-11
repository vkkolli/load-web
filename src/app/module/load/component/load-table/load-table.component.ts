import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  ViewChild,
  Injector,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ThemePalette } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { LoadBoardService } from "@app/shared/service/load-board.service";
import { PickupDeliveryDates } from "@app/shared/model/pickup-delivery-dates";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { LoadBoard } from "@app/shared/model/load.model";
import { fromEvent } from "rxjs";
import { debounceTime, takeWhile } from "rxjs/operators";

@Component({
  selector: "app-load-table",
  templateUrl: "./load-table.component.html",
  styleUrls: ["./load-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("myTable") table: any;

  @ViewChild("picker") picker: any;

  protected spinner: NgxSpinnerService;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = "primary";
  totalElements = 0;
  pageNumber = 0;
  pageSize = 10;
  data: LoadBoard[] = [];
  isAlive = true;
  tableWidth = 1340;
  showTable = true;

  @Input() rows: LoadBoard[];
  @Input() columns;
  windowResizeEvent = fromEvent(window, "resize").pipe(
    debounceTime(400),
    takeWhile(() => this.isAlive)
  );

  pickupDateEditing = {};
  deliveryDateEditing = {};

  public isPickupButtonVisible: boolean = true;

  ColumnMode =
    window.innerWidth < this.tableWidth
      ? ColumnMode.standard
      : ColumnMode.force;
  constructor(
    injector: Injector,
    private loadBoardService: LoadBoardService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.spinner = injector.get(NgxSpinnerService);
    this.windowResizeEvent.subscribe((event) => {
      this.ColumnMode =
        window.innerWidth < this.tableWidth
          ? ColumnMode.standard
          : ColumnMode.force;
          this.showTable = false;
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {
        this.showTable = true;
        this.data = [...this.data];
        this.columns = [...this.columns];
        this.changeDetectorRef.detectChanges();
      }, 10);
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.isAlive = false;
  }

  setPage(page) {
    const offsetStart = page.offset * this.pageSize;
    let offsetEnd = offsetStart + this.pageSize;
    if (offsetEnd >= this.totalElements) {
      offsetEnd = this.totalElements - 1;
    }
    this.data = this.rows?.slice(offsetStart, offsetEnd) ?? [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rows && changes.rows.currentValue) {
      this.totalElements = this.rows?.length ?? 0;
      this.data = this.rows?.slice(0, this.pageSize) ?? [];
    }
  }

  toggleExpandRow(row) {
    console.log("Toggled Expand Row!", row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log("Detail Toggled", event);
  }

  getRowClass(row) {
    return {
      // 'is-header-row': row.age % 10 === 0
      // 'is-header-row': row.loadId === 30000003
    };
  }

  updatePickupDate(event, cell, rowIndex) {
    this.spinner.show();
    this.pickupDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event : event.target.value;
    const format = "yyyy-MM-dd, HH:mm:ss";
    const locale = "en-US";
    const formattedDate = formatDate(val, format, locale);
    this.rows[rowIndex].actualPickupDate = formattedDate;
    const pickupDeliveryDates = new PickupDeliveryDates();
    pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
    pickupDeliveryDates.tripType = "ORGIN";
    pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(", ")[0];
    pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(", ")[1];
    this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
      (data) => {
        this.rows[rowIndex] = data;
        this.rows = [...this.rows];
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error("Pickup Confirmation Error ...");
      }
    );
  }

  updateDeliveryDate(event, cell, rowIndex) {
    this.deliveryDateEditing[rowIndex] = false;
    var val = event instanceof Date ? event : event.target.value;
    const format = "yyyy-MM-dd, HH:mm:ss";
    const locale = "en-US";
    const formattedDate = formatDate(val, format, locale);
    this.spinner.show();
    this.rows[rowIndex].actualDeliveryDate = formattedDate;
    const pickupDeliveryDates = new PickupDeliveryDates();
    pickupDeliveryDates.loadId = this.rows[rowIndex].loadId;
    pickupDeliveryDates.tripType = "DESTINATION";
    pickupDeliveryDates.pickupOrDeliveryDate = formattedDate.split(", ")[0];
    pickupDeliveryDates.pickupOrDeliveryTime = formattedDate.split(", ")[1];
    this.loadBoardService.setPickupDeliveryDate(pickupDeliveryDates).subscribe(
      (data) => {
        this.rows[rowIndex] = data;
        this.rows = [...this.rows];
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error("Delivery Confirmation Error ...");
      }
    );
  }
}
