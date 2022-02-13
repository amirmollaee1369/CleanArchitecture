import { Component, Inject, OnInit } from '@angular/core';
import { PersonModel } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

export interface DialogData {
  PersonId:number;
}
@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {
  model:PersonModel;
  public checked: boolean =false;
  constructor(private linkService:PersonService )  {
    this.model=new PersonModel();
   }
  save()
  {
    if(this.model.Id)
    {
      this.linkService.edit(this.model).subscribe(
        response=>{
          alert("edit Success!");
      }
        ,a=>{alert("error heppened!");
        }
      );
    }
    else
    {
      this.linkService.add(this.model).subscribe(
        response=>{
          alert("add Success!");
      }
        ,a=>{alert("error heppened!");
        }
      );
    }
  }
  ngOnInit() {
    if(this.model.Id)
    {
      this.linkService.getById(this.model.Id).subscribe(response=>{
        this.model=response;
      });
    }
  }

}
