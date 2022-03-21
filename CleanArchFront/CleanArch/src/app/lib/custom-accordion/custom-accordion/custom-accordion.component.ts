import { Component, Input, OnInit } from '@angular/core';
import { ThemeMode } from '../../shared/global.enum';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.sass']
})
export class CustomAccordionComponent implements OnInit {
  @Input('accordionId') _accordionId: string = 'accordionExample';
  @Input('theme') _theme: ThemeMode = ThemeMode.dark;
  
  themeMode=ThemeMode;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
