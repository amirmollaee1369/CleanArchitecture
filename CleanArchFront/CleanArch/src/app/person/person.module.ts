import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing.module';
import { PeopleComponent } from './people/people.component';
import { AuthGuardService } from '../shared/service/auth-guard.service';
import { CustomGridModule } from '../lib/custom-grid/custom-grid.module';

@NgModule({
  declarations: [
    PeopleComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    CustomGridModule
  ],
  providers:[
    AuthGuardService
  ]
})
export class PersonModule { }
