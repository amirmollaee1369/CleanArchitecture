import { Injectable } from '@angular/core';
import { SortMode, SourceType } from '../custom-grid.enum';
import { ColumnModel } from '../model/custom-grid-column.model';
import { GridComputedConfigModel } from '../model/custom-grid-computed-config.model';
import { GridConfigModel } from '../model/custom-grid-config.model';
import { FilterModel } from '../model/custom-grid-filter.model';

@Injectable({
  providedIn: 'root'
})
export class CustomGridService {
  gridComputedConfig: GridComputedConfigModel;
  gridConfig: GridConfigModel;
  constructor() {
    this.gridConfig = new GridConfigModel();
    this.gridComputedConfig = new GridComputedConfigModel();
  }

  setGridConfigModel(_gridConfigModel: GridConfigModel) {
    this.gridConfig = _gridConfigModel;
  }

  initGrid() {
    if (this.gridConfig.paginationEnable)
      this.generatePaging();
    else
      this.gridComputedConfig.dataSource = this.gridConfig.dataSource;
    this.gridComputedConfig.showLoader = false;
  }

  generatePaging() {
    if (this.gridConfig.dataSource.length > this.gridConfig.pageSize) {
      this.gridComputedConfig.pagesNumber = [...Array(this.gridConfig.dataSource.length / this.gridConfig.pageSize).keys()].map(i => i + 1);
    }
    else {
      this.gridComputedConfig.pagesNumber = [1];
      this.gridComputedConfig.currentPage = 1;
    }
    this.changePage();
  }

  changePage() {
    this.gridComputedConfig.dataSource = (this.gridConfig.dataSource as Array<object>).slice((this.gridComputedConfig.currentPage - 1) * this.gridConfig.pageSize, this.gridComputedConfig.currentPage * this.gridConfig.pageSize);
    if (this.gridComputedConfig.currentPage == 1)
      this.gridComputedConfig.prevPageEnable = false;
    else
      this.gridComputedConfig.prevPageEnable = true;
    if (this.gridComputedConfig.currentPage < this.gridComputedConfig.pagesNumber[this.gridComputedConfig.pagesNumber.length - 1])
      this.gridComputedConfig.nextPageEnable = true;
    else
      this.gridComputedConfig.nextPageEnable = false;
  }

  getDataSourceType(_dataSource: any) {
    if (Array.isArray(_dataSource))
      return SourceType.array;
    return SourceType.unknown;
  }

  selectPage(page: number) {
    this.gridComputedConfig.currentPage = page;
    this.changePage();
  }

  nextPage() {
    if (this.gridComputedConfig.nextPageEnable) {
      this.gridComputedConfig.currentPage = this.gridComputedConfig.currentPage + 1;
      this.changePage();
      this.gridComputedConfig.prevPageEnable = true;
      if (this.gridComputedConfig.currentPage < this.gridComputedConfig.pagesNumber[this.gridComputedConfig.pagesNumber.length - 1]) {
        this.gridComputedConfig.nextPageEnable = true;
      }
      else
        this.gridComputedConfig.nextPageEnable = false;
    }
  }

  prevPage() {
    if (this.gridComputedConfig.prevPageEnable) {
      this.gridComputedConfig.currentPage = this.gridComputedConfig.currentPage - 1;
      this.changePage();
      this.gridComputedConfig.nextPageEnable = true;
      if (this.gridComputedConfig.currentPage === 1) {
        this.gridComputedConfig.prevPageEnable = false;
      }
      else
        this.gridComputedConfig.prevPageEnable = true;
    }
  }

  sort(column: ColumnModel) {
    for (let i = 0; i < this.gridConfig.columns.length; i++) {
      this.gridComputedConfig.columns[i].sort = false;
    }
    column.sort = true;
    this.gridConfig.dataSource.sort((a: any, b: any) => {
      if (column.name) {
        if (column.sortMode === SortMode.desc)
          return (a[column.name] < b[column.name]) ? 1 : ((b[column.name] < a[column.name]) ? -1 : 0)
        else
          return (a[column.name] > b[column.name]) ? 1 : ((b[column.name] > a[column.name]) ? -1 : 0)
      }
      else
        return undefined;
    });
    column.sortMode = column.sortMode === SortMode.asc ? SortMode.desc : SortMode.asc;
    this.initGrid();
  }

  changePageSize(_pageSize: number) {
    this.gridConfig.pageSize = _pageSize; debugger
    this.initGrid();
  }

  initColumnsComputed() {
    this.gridComputedConfig.columns = this.gridConfig.columns.map((col: string) => {
      return new ColumnModel(col, false, SortMode.desc);
    });
  }

  filterChange(filterModel: FilterModel) {
    this.gridComputedConfig.dataSource=this.gridConfig.dataSource.filter(
      (item:any)=> {
        if(filterModel.columnModel.name){
          return item[filterModel.columnModel.name].includes(filterModel.filterValue);
        }
      });
  }

}
