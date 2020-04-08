import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RepositoryService } from 'src/app/core/services/repository.service';


@Injectable()
export class CreateLoadService {

    private _baseUrl: string = "/";

    constructor(private http: HttpClient, private repository: RepositoryService) {

    }

    public createLoad(loadDetails: any) {
        //var registrationUser = new RegistrationUser().modelMapper(userDetail, roleType);
        return this.repository.post(this._baseUrl, "/create", loadDetails)
            .pipe(
                map(data => {
                    if (data) {
                        return { "success": true };
                    }
                }));
    }



}