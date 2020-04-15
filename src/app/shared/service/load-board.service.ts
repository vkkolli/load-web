import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { LoadBoard } from '../model/load.model';
import { environment } from 'environments/environment';
import * as urljoin from "url-join";

@Injectable()
export class LoadBoardService {

    private _loadBoardUrl: string = urljoin(environment.loadApiPath, "load");
    private loads: LoadBoard[];

    constructor(private http: HttpClient ) {

    }

    getLoads(): Observable<LoadBoard[]> {
        if (this.loads) {
            return of(this.loads);
        }
        return this.http.get<LoadBoard[]>(this._loadBoardUrl);
    }



}
