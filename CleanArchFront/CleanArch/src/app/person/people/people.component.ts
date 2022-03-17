import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../shared/model/person.model';
import { PersonService } from '../shared/service/person.service';
import { peopleAnimations } from './people.component.animation';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
  animations: peopleAnimations
})
export class PeopleComponent implements OnInit {
  dataSource:Array<PersonModel>;
  constructor(private _personService:PersonService) { 
    this.dataSource=new Array<PersonModel>();
  }

  ngOnInit(): void {
    debugger
    this._personService.getAll().subscribe(a=>{
      this.dataSource=a;
    });
    debugger
  }

}
