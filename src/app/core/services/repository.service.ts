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
