import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomGridRoutingModule } from './custom-grid-routing.module';
import { CustomGridComponent } from './custom-grid/custom-grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomGridService } from './shared/service/custom-grid.service';
import { CustomAccordionModule } from '../custom-accordion/custom-accordion.module';
import { CustomColumnHeaderComponent } from './custom-column-header/custom-column-header.component';
import { CustomColumnPaginationComponent } from './custom-column-pagination/custom-column-pagination.component';

@NgModule({
  declarations: [
    CustomGridComponent,
    CustomColumnHeaderComponent,
    CustomColumnPaginationComponent
  ],
  imports: [
    CommonModule,
    CustomGridRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CustomAccordionModule
  ],
  exports:[
    CustomGridComponent
  ],
  providers:[
    CustomGridService
  ]
})
export class CustomGridModule { }
