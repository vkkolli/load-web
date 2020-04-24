import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '@app/core/abstracts/base-service.abstract';
import { Router } from '@angular/router';
import { LoadApiService } from '@app/core/services/load.api.service';
import { Load } from '@app/shared/model/load';
import { RepositoryService } from '@app/core/services/repository.service';
import { Observable } from 'rxjs';
import { MapResponse } from '@app/shared/model/map-response';
import { environment } from 'environments/environment';

import * as urljoin from "url-join";

const BASE_PATH = urljoin(environment.loadApiPath, "/load/");
@Injectable({
  providedIn: 'root'
})
export class LoadService extends BaseService<Load>{

    API_KEY: string = 'AIzaSyD-XqQu8wb1NSuDOkpOT-6n39IroPkHQ48';

    constructor(
      injector: Injector,
      router: Router,
      loadApiService: LoadApiService,
      private repo: RepositoryService
    ) {
      super(injector, loadApiService);
    }

    copyData(newData: Load, isUpdate: boolean): Load {
      let load: Load;
      return load;
    }


    public fetchByIsd(loadId: number) {
      return  this.repo.get<Load>(BASE_PATH + loadId);
    }

    calculateMileage(origin: number, dest: number): Observable<MapResponse> {
      return this.repo.get<MapResponse>('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + dest + '&key=' + this.API_KEY + '&units=imperial');
    }

    onSaveComplete(response: Load) {
      this.spinner.hide();
      this.toastr.success('Load created successfully!');
      this.router.navigate(['/load', '/']);
    }

    onSaveFailed(error: HttpErrorResponse) {
      this.spinner.hide();
      this.toastr.error('Load failed!');
    }

    onDestroy() {
    }

}
