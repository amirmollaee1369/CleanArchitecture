import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { BadInputError } from 'src/app/shared/errors/bad-input-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridRequest } from 'src/app/lib/custom-grid/shared/model/custom-grid-request.model';
import { FilterResponse } from '../model/custom-grid-filter-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomGridDataService {
  
  constructor(private _httpClient: HttpClient) {
  }

  getByPage(_url:string,gridRequest:GridRequest,token?:string): Observable<FilterResponse> {
    return this._httpClient.post(`${environment.apiUrl}${_url}/GetByPage`, gridRequest , this.createHeaders(token)).pipe(
      map(this.handleMapError),
      catchError(this.handleError)
    );
  }

  private handleMapError(res:any){
    if (!res) {
      throw new Error('Value expected!');
    }
    return res;
  }

  private handleError(error: Response) {
    switch (error.status) {
      case 400:
        return throwError(new BadInputError(error));
      case 404:
        return throwError(new NotFoundError(error));
      default:
        return throwError(new AppError(error));
    }
  }

  private createHeaders(token?:string) {
    if (token) {
      return { headers: new HttpHeaders().append('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token) };
    }
    return { headers: new HttpHeaders().append('Content-Type', 'application/json') };
  }

}
