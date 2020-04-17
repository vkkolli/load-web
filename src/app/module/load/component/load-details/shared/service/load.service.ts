import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '@app/core/abstracts/base-service.abstract';
import { Router } from '@angular/router';
import { LoadApiService } from '@app/core/services/load.api.service';
import { Load } from '@app/shared/model/load';

@Injectable({
  providedIn: 'root'
})
export class LoadService extends BaseService<Load>{

    constructor(
      injector: Injector,
      router: Router,
      loadApiService: LoadApiService,
    ) {
      super(injector, loadApiService);
    }

    copyData(newData: Load, isUpdate: boolean): Load {
      let load: Load;
      return load;
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
