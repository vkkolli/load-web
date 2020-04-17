import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '@app/core/abstracts/base-service.abstract';
import { Router } from '@angular/router';
import { LoadApiService } from '@app/core/services/load.api.service';
import { Load } from '@app/shared/model/load';
import { RepositoryService } from '@app/core/services/repository.service';
import { Observable } from 'rxjs';
import { Distance } from '@app/shared/model/distance';

@Injectable({
  providedIn: 'root'
})
export class LoadService extends BaseService<Load>{
    repo: RepositoryService;

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

    public calculateMileage(origin: number, dest: number): Observable<Distance> {
      return this.repo.get<Distance>('https://www.zipcodeapi.com/rest/RswiQqwT4aAaxatZn1rmW3N07TvlstJsyOyMvazIHDoQXWa4LgqoFO5Kr45v3B0u/distance.json/' + origin + '/' + dest + '/mile');
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
