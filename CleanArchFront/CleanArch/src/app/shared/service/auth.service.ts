import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthenticateModel } from '../model/authentication.model';
import { TokenDecodeModel } from '../model/token-decode.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient,
    private _router: Router,
    private _tokenStorageService:TokenStorageService) { }

  login(email: string, password: string) {
    return this._httpClient.post<AuthenticateModel>(
      `${environment.apiUrl}person/login`,
      { Email: email, Password: password });
  }

  logOut() {
    this._tokenStorageService.remove();
    this._router.navigateByUrl('home');
  }

  isLoggedIn() {
    return this._tokenStorageService.load() != null;
  }

  get currentUser() {
    let token = this._tokenStorageService.load();
    if (!token) return null;
    let result=new JwtHelperService().decodeToken(token) as TokenDecodeModel;
    return result;
  }
}
