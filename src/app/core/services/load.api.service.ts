import { Injectable, Injector } from "@angular/core";

import * as urljoin from "url-join";

import { Load } from "@app/shared/model/load";
import { BaseCRUD } from "../abstracts/BaseCRUD.abstract";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const BASE_PATH = urljoin(environment.loadApiPath, "/load");
@Injectable({
  providedIn: "root"
})
export class LoadApiService extends BaseCRUD<Load> {
  constructor(injector: Injector) {
    super(injector, BASE_PATH);
  }

}
