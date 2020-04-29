import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '@app/core/abstracts/base-service.abstract';
import { LoadApiService } from '@app/core/services/load.api.service';
import { RepositoryService } from '@app/core/services/repository.service';
import { Carrier } from '@app/shared/model/carrier';
import { Load } from '@app/shared/model/load';
import { MapResponse } from '@app/shared/model/map-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import * as urljoin from "url-join";


const BASE_PATH = urljoin(environment.loadApiPath, "/load/");
const CARRIER_PATH = urljoin(environment.loadApiPath, "/carrier/search");
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

    public fetchCarriers(carrier: string) {
      return this.repo.get<Array<Carrier>>(CARRIER_PATH + carrier);
    }

    calculateMileage(origin: number, dest: number): Observable<MapResponse> {
      return this.repo.getMap<MapResponse>('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + dest + '&key=' + this.API_KEY + '&units=imperial');
    }

    onSaveComplete(response: Load) {
      this.spinner.hide();
      this.toastr.success('Load Created Successfully!');
      this.router.navigate(['/load']);
    }

    onEditComplete(response: Load) {
      this.spinner.hide();
      this.toastr.success('Load Updated Successfully!');
      this.router.navigate(['/load']);
    }

    onSaveFailed(error: HttpErrorResponse) {
      this.spinner.hide();
      this.toastr.error('Load Creation Failed!');
    }

    onDestroy() {
    }

}
