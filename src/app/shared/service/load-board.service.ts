import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryService } from '@app/core/services/repository.service';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import * as urljoin from "url-join";
import { Load } from '../model/load';
import { LoadBoard } from '../model/load.model';
import { LoadBoardParameters } from '../model/params/load-board-parameters';
import { PickupDeliveryDates } from '../model/pickup-delivery-dates';


@Injectable()
export class LoadBoardService {

    private _loadBoardUrl: string = urljoin(environment.loadApiPath, "load");
    private loads: LoadBoard[];

    constructor(private http: HttpClient, private repo: RepositoryService ) {

    }

    getLoads(): Observable<LoadBoard[]> {
      if (this.loads) {
          return of(this.loads);
      }
      return this.http.get<LoadBoard[]>(this._loadBoardUrl);
  }

  getLoadSearch(searchLoad : LoadBoardParameters): Observable<LoadBoard[]> {
    const url = urljoin(environment.loadApiPath, 'load/search');
    return this.repo.post<LoadBoard[]>(url,searchLoad);
  }

  setPickupDeliveryDate(pickupDeliveryDates : PickupDeliveryDates): Observable<LoadBoard> {
      const url = urljoin(environment.loadApiPath, 'load/confirmPickupDelivery');
      return this.repo.post<LoadBoard>(url,pickupDeliveryDates);
    }


}
