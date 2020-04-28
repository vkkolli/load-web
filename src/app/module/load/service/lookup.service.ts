import { Injectable } from '@angular/core';
import { RepositoryService } from '@app/core/services/repository.service';
import { Carrier } from '@app/shared/model/carrier';
import { LoadStatus } from '@app/shared/model/load-status';
import { Lookup } from '@app/shared/model/lookup';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import * as urljoin from 'url-join';

const LOOKUP_PATH = urljoin(environment.loadApiPath, 'load/lookup');
const ZIP_PATH = urljoin(environment.loadApiPath, 'zipcode');
const CUSTOM_PATH = environment.loadApiPath;

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  pricingLineItem$ = new BehaviorSubject<Array<Lookup>>([]);
  loadStatuses$ = new BehaviorSubject<Array<LoadStatus>>([]);

  constructor(private repo: RepositoryService) {
    this.fetchLoadStatuses();
  }

  // Pricing Line item list
  public fetchPricingLineItem() {
    this.repo
      .get<Array<Lookup>>(urljoin(LOOKUP_PATH, '/pricinglineitems'))
      .subscribe(pricingLineItem => this.pricingLineItem$.next(pricingLineItem));
  }

  fetchLoadStatuses() {
    this.repo
    .get<Array<LoadStatus>>(urljoin(CUSTOM_PATH, 'load/status'))
    .subscribe(loadStatus => this.loadStatuses$.next(loadStatus));
  }

  fetchCityStateZip(search: string) {
    const url = urljoin(ZIP_PATH, '/search/' + search);
    return this.repo.get<Array<String>>(url);
  }

  fetchCustDetails(search: string) {
    const url = urljoin(environment.loadApiPath, 'customer/search/' + search);
    return this.repo.get<Array<String>>(url);
  }

  fetchCarrierDetails(search: string): Observable<Array<Carrier>> {
    const url = urljoin(environment.loadApiPath, 'carrier/search/' + search);
    return this.repo.get<Array<Carrier>>(url);
  }

}
