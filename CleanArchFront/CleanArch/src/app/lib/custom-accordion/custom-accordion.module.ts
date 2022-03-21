import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomAccordionRoutingModule } from './custom-accordion-routing.module';
import { CustomAccordionComponent } from './custom-accordion/custom-accordion.component';


@NgModule({
  declarations: [
    CustomAccordionComponent
  ],
  imports: [
    CommonModule,
    CustomAccordionRoutingModule
  ],
  exports:[
    CustomAccordionComponent
  ]
})
export class CustomAccordionModule { }
