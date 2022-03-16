import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  store(token: string) {
    sessionStorage.setItem('token', token);
  }

  load(): string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }

  remove(){
    sessionStorage.removeItem('token');
  }

}
