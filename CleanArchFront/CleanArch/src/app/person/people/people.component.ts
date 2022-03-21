import { Component, OnInit } from '@angular/core';
import { ThemeMode } from 'src/app/lib/shared/global.enum';
import { PersonModel } from '../shared/model/person.model';
import { PersonService } from '../shared/service/person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
})
export class PeopleComponent implements OnInit {
  dataSource:Array<PersonModel>;
  themeMode=ThemeMode;
  constructor(private _personService:PersonService) { 
    this.dataSource=new Array<PersonModel>();
  }

  ngOnInit(): void {
    this._personService.getAll().subscribe(a=>{
      this.dataSource=a;
    });
  }

}
