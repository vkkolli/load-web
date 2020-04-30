import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { LoadBoard } from '../model/load.model';
import { environment } from 'environments/environment';
import * as urljoin from "url-join";
import { PickupDeliveryDates } from '../model/pickup-delivery-dates';
import { RepositoryService } from '@app/core/services/repository.service';
import { Load } from '../model/load';

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


    setPickupDeliveryDate(pickupDeliveryDates : PickupDeliveryDates) {
        const url = urljoin(environment.loadApiPath, 'load/confirmPickupDelivery');
        return this.repo.post<Load>(url,pickupDeliveryDates);
      }


}
