import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders, HttpEventType  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public get(url: string, endpoint: string, params?: any): Observable<any> {
    let reqParams: HttpParams = null;
    if(params){
      reqParams = new  HttpParams();
      Object.keys(params).forEach(key => {
        reqParams.append(key, params[key]);
      })
    }
    return this.handleRequest('Get', url + endpoint, null, reqParams);
  }

  public post(url: string, endpoint: string, body: any): Observable<any> {
    return this.handleRequest('Post', url + endpoint, body);
  }

  private handleRequest(method: string, url: string, reqBody?: any, reqParams?: HttpParams, reqHeaders?: HttpHeaders): Observable<any> {  

    let httpObserve : any = "response";
    let httpResponseType : any = "json";
    if(!reqHeaders){
      reqHeaders =  new HttpHeaders();
    }
    reqHeaders = reqHeaders.set("Content-Type", "application/json");

    let httpOptions  = 
    { 
      body : reqBody,
      headers: reqHeaders,
      params: reqParams,     
      responseType: httpResponseType,
      observe : httpObserve
    };

    return new Observable((observer) => {
      this.http.request(method, url, httpOptions)      
        .subscribe(
        (response) => {
          const resBody = response["body"] ? response["body"] : {};
          observer.next(Object.assign(resBody, {"resStatus": response["ok"] }));
          observer.complete();
        });
      });
  }
}
