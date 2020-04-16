import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lookup } from '@app/shared/model/lookup';
import { RepositoryService } from '@app/core/services/repository.service';
import { environment } from 'environments/environment';

import * as urljoin from 'url-join';
const LOOKUP_PATH = urljoin(environment.loadApiPath, 'load/lookup');
const ZIP_PATH = urljoin(environment.loadApiPath, 'zipcode');
const CUST_PATH = environment.loadApiPath;

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  pricingLineItem$ = new BehaviorSubject<Array<Lookup>>([]);

  constructor(private repo: RepositoryService) {
    // this.fetchPricingLineItem();
  }

  // Pricing Line item list
  public fetchPricingLineItem() {
    this.repo
      .get<Array<Lookup>>(urljoin(LOOKUP_PATH, '/pricinglineitems'))
      .subscribe(pricingLineItem => this.pricingLineItem$.next(pricingLineItem));
  }

  fetchCityStateZip(search: string) {
    const url = urljoin(ZIP_PATH, '/search/' + search);
    return this.repo.get<Array<String>>(url);
  }

  fetchCustDetails(search: string) {
    const url = urljoin(CUST_PATH, 'customer/search/' + search);
    return this.repo.get<Array<String>>(url);
  }

}
