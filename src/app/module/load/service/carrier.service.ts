import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CarrierApiService } from '@app/core/services/carrier.api.service';
import { RepositoryService } from '@app/core/services/repository.service';
import { AssignCarrier } from '@app/shared/model/assign-carrier';
import { Load } from '@app/shared/model/load';
import { environment } from 'environments/environment';
import * as urljoin from 'url-join';


@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  constructor(
    injector: Injector,
    router: Router,
    carrierApiService: CarrierApiService,
    private repo: RepositoryService
    ) {
    }

  assignCarrier(assignCarrier : AssignCarrier) {
    const url = urljoin(environment.loadApiPath, 'load/assignCarrier');
    return this.repo.post<Load>(url,assignCarrier);
  }

}
