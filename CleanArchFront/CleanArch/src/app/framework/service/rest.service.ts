import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  

  constructor(private http:HttpClient) { }
  public post<TResonse>(resource: string, model: any): Observable<TResonse> {
    return this.http.post<TResonse>(this.getUrl(resource), model);
  }
  public postFile<TResonse>(resource: string, model: any): Observable<TResonse> {
    return this.http.post<TResonse>(this.getUrl(resource), model);
  }
  public put<TResonse>(resource: string, model: any): Observable<TResonse> {
    return this.http.put<TResonse>(this.getUrl(resource), model);
  }
  public getAll<TResonse>(resource: string): Observable<TResonse> {
    return this.http.get<TResonse>(this.getUrl(resource));
  }
  public getById<TResonse>(resource: string, id: number): Observable<TResonse> {
    return this.http.get<TResonse>(this.getUrl(resource) + id);
  }
  public getByStringParam<TResonse>(resource: string, title: string): Observable<TResonse> {
    return this.http.get<TResonse>(this.getUrl(resource) + title);
  }
  public delete(resource: string,id:number)
  {
    return this.http.delete(this.getUrl(resource) + id);
  }

  public getUrl(resource: string) {
    return `${environment.baseUrl}${resource}`;
  }
}
