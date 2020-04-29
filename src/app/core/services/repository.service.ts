import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string, params?: any): Observable<T> {
    let reqParams: HttpParams = null;
    if (params) {
      reqParams = new HttpParams();
      Object.keys(params).forEach(key => {
        reqParams = reqParams.append(key, params[key]);
      });
    }
    return this.handleRequest<T>('Get', url, null, reqParams).pipe(
      map((request: any) => ('body' in request ? request.body : request))
    );
  }

  public getMap<T>(url: string, params?: any): Observable<T> {
    let reqParams: HttpParams = null;
    if (params) {
      reqParams = new HttpParams();
      Object.keys(params).forEach(key => {
        reqParams = reqParams.append(key, params[key]);
      });
    }

    const reqHeaders = new HttpHeaders();
    reqHeaders.set('Content-Type', 'application/json');
    reqHeaders.set('Accept', 'application/json');
    reqHeaders.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    reqHeaders.set('Access-Control-Allow-Credentials', 'true');
    reqHeaders.set('GET', 'POST');
    return this.handleRequest<T>('Get', url, null, reqParams, reqHeaders).pipe(
      map((request: any) => ('body' in request ? request.body : request))
    );
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.handleRequest<T>('Post', url, body).pipe(
      map((request: any) => ('body' in request ? request.body : request))
    );
  }

  public postMultipart<T>(url: string, body: any): Observable<T> {
    return this.handleRequest<T>('Post', url, body, null, new HttpHeaders());
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.handleRequest<T>('Put', url, body);
  }

  public delete(url: string, params?: any): Observable<any> {
    let reqParams: HttpParams = null;
    if (params) {
      reqParams = new HttpParams();
      Object.keys(params).forEach(key => {
        reqParams = reqParams.append(key, params[key]);
      });
    }
    return this.handleRequest('Delete', url, null, reqParams);
  }

  private handleRequest<T>(
    method: string,
    url: string,
    reqBody?: any,
    reqParams?: HttpParams,
    reqHeaders?: HttpHeaders
  ): Observable<T> {
    const httpResponseType = 'json';
    if (!reqHeaders) {
      reqHeaders = new HttpHeaders();
      reqHeaders = reqHeaders.set('Content-Type', 'application/json');
    }

    const httpOptions = {
      body: reqBody,
      headers: reqHeaders,
      params: reqParams,
      responseType: httpResponseType as 'json'
    };

    return this.http.request<T>(method, url, httpOptions);
  }
}
