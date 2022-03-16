
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonService extends DataService {
  
  constructor(_httpClient: HttpClient,_tokenStorageService:TokenStorageService) {
    super(`${environment.apiUrl}Person`,_httpClient,_tokenStorageService);
  }

}
