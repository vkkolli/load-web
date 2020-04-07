import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { LoadBoard } from '../model/load.model';


@Injectable()
export class LoadBoardService {

    private _loadBoardUrl: string = "/assets/data/load.json";
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