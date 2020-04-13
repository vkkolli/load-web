import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Injector, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { BaseCRUD } from "./BaseCRUD.abstract";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { Base } from "@shared/model/base";
import { Router } from "@angular/router";
import { tap, takeWhile } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { PageParam } from "@app/shared/types/page-param.type";
import { Paginated } from "@app/shared/types/paginated.type";
import {
  SERVER_ERROR_MSG
} from "@app/shared/types/constants";

export abstract class BaseService<T extends Base> implements OnInit, OnDestroy {
  protected isAlive = true;

  protected spinner: NgxSpinnerService;
  protected toastr: ToastrService;
  protected subscriptions = new Subscription();
  protected router: Router;

  public onSave$ = new EventEmitter();
  public isSaveDisabled$ = new BehaviorSubject<boolean>(false);
  public api: BaseCRUD<T>;

  public page$ = new BehaviorSubject<Paginated<T>>(new Paginated<T>());
  public list$ = new BehaviorSubject<Array<T>>([]);
  public item$ = new BehaviorSubject<T>(null);

  constructor(injector: Injector, api: BaseCRUD<T>) {
    this.spinner = injector.get(NgxSpinnerService);
    this.toastr = injector.get(ToastrService);
    this.router = injector.get(Router);
    this.api = api;
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.isAlive = false;
    this.onDestroy();
  }

  abstract copyData(newData: T, isUpdate: boolean): T;
  abstract onSaveComplete(response: T);
  abstract onSaveFailed(response: HttpErrorResponse);
  abstract onDestroy();

  setData(data: Array<T> | Paginated<T>) {
    if (data instanceof Array) {
      this.list$.next(data);
    } else {
      this.page$.next(data);
    }
  }

  fetchAll(page?: PageParam): void {
    this.spinner.show();
    this.api
      .fetchAll()
      .pipe(
        takeWhile(_ => this.isAlive),
        tap(() => this.spinner.hide())
      )
      .subscribe({
        next: data => this.setData(data),
        error: this.errorHandler.bind(this)
      });
  }

  fetchById(id: number): Observable<T> {
    this.spinner.show();
    this.api
      .fetchById(id)
      .pipe(
        takeWhile(_ => this.isAlive),
        tap(() => this.spinner.hide())
      )
      .subscribe({
        next: entity => this.item$.next(entity),
        error: this.errorHandler.bind(this)
      });
      return this.item$;
  }

  saveOrUpdate(newData: T): void {
    this.spinner.show();
    const sub = this.api.save(newData).subscribe({
      next: response => this.onSaveComplete(response),
      error: error => this.onSaveFailed(error)
    });
    this.subscriptions.add(sub);
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    this.toastr.error(SERVER_ERROR_MSG, `Error!!`);
    this.spinner.hide();
  }
}
