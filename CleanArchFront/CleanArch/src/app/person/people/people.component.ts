import { Component, OnInit } from '@angular/core';
import { ThemeMode } from 'src/app/lib/shared/global.enum';
import { GridRequest } from 'src/app/lib/custom-grid/shared/model/custom-grid-request.model';
import { PersonService } from '../shared/service/person.service';
import { SourceType } from 'src/app/lib/custom-grid/shared/custom-grid.enum';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
})
export class PeopleComponent implements OnInit {
  //dataSource:Array<PersonModel>;
  dataSource: Observable<any> = new Observable();
  dataSourceUrl: string = 'Person';
  themeMode = ThemeMode;
  sourceType = SourceType;
  token: string;
  constructor(_tokenStorageService:TokenStorageService,private _personService: PersonService) {
    this.token=_tokenStorageService.load() || '';
    this.dataSource = this._personService.getAll();
  }

  ngOnInit(): void {

  }

}
