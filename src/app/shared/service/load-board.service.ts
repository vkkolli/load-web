import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ILoad } from '../model/load.model';


@Injectable()
export class LoadBoardService {

    private _loadBoardUrl: string = "/assets/data/load.json";
    private loads: ILoad[];

    constructor(private http: HttpClient ) {

    }

    getLoads(): Observable<ILoad[]> {
        if (this.loads) {
            return of(this.loads);
        }
        return this.http.get<ILoad[]>(this._loadBoardUrl);
    }

   
    
}