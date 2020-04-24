import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

import * as urljoin from 'url-join';
import { RepositoryService } from '@app/core/services/repository.service';
import { Address } from '@app/shared/model/address';

const BASE_PATH = urljoin(environment.loadApiPath, '/customer/');
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private repo: RepositoryService) { }

  public getCustomerAddress(customerId: number): Observable<Array<Address>>{
    return this.repo.get<Array<Address>>(BASE_PATH + 'address/' + customerId);
  }

}
