import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeMode } from '../../shared/global.enum';
import { FilterLogic, FilterOperator, SortMode } from '../shared/custom-grid.enum';
import { GridFilter } from '../shared/model/custom-grid-filter.model';
import { GridSort } from '../shared/model/custom-grid-sort.model';

@Component({
  selector: 'app-custom-column-header',
  templateUrl: './custom-column-header.component.html',
  styleUrls: ['./custom-column-header.component.sass']
})
export class CustomColumnHeaderComponent implements OnInit {
  @Output('sortClick') sortClick: EventEmitter<GridSort> = new EventEmitter();
  @Output('filterChange') filterChange: EventEmitter<GridFilter> = new EventEmitter();

  @Input('theme') _theme: ThemeMode = ThemeMode.dark;
  @Input('column') column?: string;
  @Input('gridSort') gridSort?: GridSort = new GridSort();
  @Input('gridFilter') gridFilter?: GridFilter = new GridFilter();
  themeMode = ThemeMode;
  sortMode = SortMode;
  constructor() {
  }

  ngOnInit(): void {
    if (!this.gridSort)
      this.gridSort = new GridSort(this.column, SortMode.desc);
  }

  onClick() {
    if (this.gridSort && this.gridSort.Dir)
      this.gridSort.Dir = this.gridSort?.Dir === SortMode.asc ? SortMode.desc : SortMode.asc;
    else
      this.gridSort = new GridSort(this.column, SortMode.desc);
    this.sortClick.emit(this.gridSort);
  }

  onFilterChange($event: any) {
    this.filterChange.emit(
      new GridFilter(FilterOperator.eq, this.column, $event.currentTarget.value, FilterLogic.and)
    );
  }
}
