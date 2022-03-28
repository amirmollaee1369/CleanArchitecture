import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { BadInputError } from 'src/app/shared/errors/bad-input-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { GridRequest } from '../../lib/custom-grid/shared/model/custom-grid-request.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private _url: string,
    private _httpClient: HttpClient,
    private _tokenStorageService: TokenStorageService) {
  }

  getAll() {
    return this._httpClient.get(`${this._url}/Get`, this.createHeaders()).pipe(
      map(this.handleMapError),
      catchError(this.handleError)
    );
  }

  getByPage(gridRequest:GridRequest) {
    return this._httpClient.post(`${this._url}/GetByPage`, gridRequest , this.createHeaders()).pipe(
      map(this.handleMapError),
      catchError(this.handleError)
    );
  }

  create(model: any) {
    return this._httpClient.post(`${this._url}/Create`, model, this.createHeaders()).pipe(
      map(this.handleMapError),
      catchError(this.handleError)
    );
  }

  update(model: any) {
    return this._httpClient.put(`${this._url}/Update`, model, this.createHeaders()).pipe(
      map(this.handleMapError),
      catchError(this.handleError)
    );
  }

  delete(model: any) {
    return this._httpClient.delete(`${this._url}/Delete/${model.id}`, this.createHeaders()).pipe(
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

  private createHeaders() {
    const token = this._tokenStorageService.load();

    if (token) {
      return { headers: new HttpHeaders().append('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token) };
    }
    return { headers: new HttpHeaders().append('Content-Type', 'application/json') };
  }
}
