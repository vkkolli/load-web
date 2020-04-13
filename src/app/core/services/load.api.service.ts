import { Injectable, Injector } from "@angular/core";

import * as urljoin from "url-join";

import { Load } from "@app/shared/model/load";
import { BaseCRUD } from "../abstracts/BaseCRUD.abstract";
import { environment } from 'environments/environment';

const BASE_PATH = urljoin(environment.loadApiPath, "/");
@Injectable({
  providedIn: "root"
})
export class LoadApiService extends BaseCRUD<Load> {
  constructor(injector: Injector) {
    super(injector, BASE_PATH);
  }
}
