import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lookup } from '@app/shared/model/lookup';
import { RepositoryService } from '@app/core/services/repository.service';
import { environment } from 'environments/environment';

import * as urljoin from 'url-join';
const LOOKUP_PATH = urljoin(environment.loadApiPath, 'load/lookup');
const ZIP_PATH = urljoin(environment.loadApiPath, 'load');

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  pricingLineItem$ = new BehaviorSubject<Array<Lookup>>([]);

  constructor(private repo: RepositoryService) {
    this.fetchPricingLineItem();
  }

  // Pricing Line item list
  public fetchPricingLineItem() {
    this.repo
      .get<Array<Lookup>>(urljoin(LOOKUP_PATH, '/pricinglineitems'))
      .subscribe(pricingLineItem => this.pricingLineItem$.next(pricingLineItem));
  }

  fetchCityStateZip(search: string) {
    const url = urljoin(ZIP_PATH, 'getzip/' + search);
    return this.repo.get<Array<String>>(url);
  }

}
