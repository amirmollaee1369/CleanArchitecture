import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeMode } from '../../shared/global.enum';
import { SortMode } from '../shared/custom-grid.enum';
import { ColumnModel } from '../shared/model/custom-grid-column.model';
import { FilterModel } from '../shared/model/custom-grid-filter.model';

@Component({
  selector: 'app-custom-column-header',
  templateUrl: './custom-column-header.component.html',
  styleUrls: ['./custom-column-header.component.sass']
})
export class CustomColumnHeaderComponent implements OnInit {
  @Output('sortClick') sortClick: EventEmitter<ColumnModel> = new EventEmitter();
  @Output('filterChange') filterChange: EventEmitter<FilterModel> = new EventEmitter();

  @Input('theme') _theme: ThemeMode = ThemeMode.dark;
  @Input('column') column:ColumnModel=new ColumnModel();

  themeMode=ThemeMode;
  sortMode=SortMode;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onClick(column:ColumnModel){
    this.sortClick.emit(column);
  }

  onFilterChange($event:any){
    this.filterChange.emit(
    new FilterModel(this.column,$event.currentTarget.value)
    );
  }
}
