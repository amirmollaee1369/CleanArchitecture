import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePersonComponent } from './create-person/create-person.component';
import { PeopleComponent } from './people/people.component';
import { PersonRoutingModule } from './person-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from '../material.module';



@NgModule({
  declarations: [CreatePersonComponent,PeopleComponent],
  imports: [
    CommonModule,
    CommonModule,
    PersonRoutingModule,
    HttpClientModule,
    FormsModule,
    MyMaterialModule
  ],
  entryComponents:[
    CreatePersonComponent
  ]
})
export class PresonModule { }
