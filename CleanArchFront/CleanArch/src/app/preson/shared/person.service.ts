import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/framework/service/rest.service';

import { PersonModel } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private resourceName = 'Person';
  constructor(private restService: RestService) {
  }

  public getAll(): Observable<any> {
    return this.restService.getAll(this.resourceName);
  }
  public delete(PersonId:number)
  {
    return this.restService.delete(this.resourceName,PersonId);
  }
  public add(model:PersonModel)
  {
    return this.restService.post(this.resourceName,model);
  }
  public edit(model:PersonModel)
  {
    return this.restService.put(this.resourceName,model);
  }
  public getById(PersonId:number) : Observable<PersonModel>
  {
    return this.restService.getById(this.resourceName,PersonId);
  }
}
