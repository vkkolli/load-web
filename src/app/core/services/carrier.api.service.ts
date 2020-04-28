import { Injectable, Injector } from "@angular/core";
import { Carrier } from '@app/shared/model/carrier';
import { environment } from 'environments/environment';
import * as urljoin from "url-join";
import { BaseCRUD } from "../abstracts/BaseCRUD.abstract";

const BASE_PATH = urljoin(environment.loadApiPath, "/carrier");
@Injectable({
  providedIn: "root"
})
export class CarrierApiService extends BaseCRUD<Carrier> {
  constructor(injector: Injector) {
    super(injector, BASE_PATH);
  }

}
