import { Injectable } from '@angular/core';
import { SortMode, SourceType } from '../custom-grid.enum';
import { GridConfigModel } from '../model/custom-grid-config.model';
import { FilterResponse } from '../model/custom-grid-filter-response.model';
import { GridFilter } from '../model/custom-grid-filter.model';
import { GridSort } from '../model/custom-grid-sort.model';
import { CustomGridDataService } from './custom-grid-data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomGridService {
  dataSourceComp: any;
  originGridConfig: GridConfigModel;
  gridConfig: GridConfigModel;
  showLoader: boolean = true;
  constructor(
    private _customGridDataService: CustomGridDataService
  ) {
    this.originGridConfig = new GridConfigModel();
    this.gridConfig = new GridConfigModel();
  }

  //Init Grid
  initGrid(_gridConfig: GridConfigModel) {
    //Set Grid Config
    this.originGridConfig = _gridConfig;
    this.gridConfig = _gridConfig;
    //===============
    this.laodDataSource();
  }
  //==============

  //Load DataSource
  laodDataSource() {
    switch (this.gridConfig.sourceType) {
      case SourceType.observable:
        this.dataSourceComp = this.gridConfig.dataSource;
        this.refreshGrid();
        break;
      case SourceType.url:
        this.getDataSourceFromUrl();
        break;
    }
  }
  getDataSourceFromUrl() {
    this._customGridDataService.getByPage(
      this.gridConfig.dataSourceUrl,
      this.gridConfig.gridRequest,
      this.gridConfig.token
    ).subscribe((result: FilterResponse) => {
      this.gridConfig.filterResponse = result;
      this.dataSourceComp = result.data;
      this.showLoader = false;
      this.pagingDataSource();
    });
  }
  //===============

  //Compute Grid DataSource
  refreshGrid() {
    this.showLoader = true;
    switch (this.gridConfig.sourceType) {
      case SourceType.observable:
        this.dataSourceComp = this.gridConfig.dataSource;
        if (this.sortConfig.length > 0)
          this.sortDataSource();
        if (this.filterConfig && this.filterConfig.length > 0)
          this.filterDataSource();
        if (this.paginationConfig.paginationEnable)
          this.pagingDataSource();
        this.computeDataSource();
        this.showLoader = false;
        break;
      case SourceType.url:
        this.getDataSourceFromUrl();
        break;
    }
  }


  //===============

  //Header Tools
  //Pagination
  pagingDataSource() {
    let pageSize: number = this.gridConfig.paginationConfig.pageSize;
    let dataSourceLength: number = 0;
    switch (this.gridConfig.sourceType) {
      case SourceType.observable:
        dataSourceLength = this.gridConfig.dataSource.length;
        break;
      case SourceType.url:
        dataSourceLength = this.gridConfig.filterResponse.total || 0;
        break;
    }
    if (dataSourceLength > pageSize) {
      this.paginationConfig.pagesNumber = [...Array(Math.ceil(dataSourceLength / pageSize)).keys()].map(i => i + 1);
    }
    else {
      this.paginationConfig.pagesNumber = [1];
      this.paginationConfig.currentPage = 1;
    }
    this.computeNextPrevEn();
  }

  computeDataSource() {
    this.dataSourceComp = (this.gridConfig.dataSource as Array<object>).slice((this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize, this.paginationConfig.currentPage * this.paginationConfig.pageSize);
  }

  changePageSize(pageSize: number) {
    this.paginationConfig.pageSize = pageSize;
    this.paginationConfig.currentPage = 1;
    if (this.gridConfig.sourceType == SourceType.url)
      this.computeGridRequest();
    this.refreshGrid();
  }

  computeGridRequest() {
    this.gridRequest.Skip = (this.paginationConfig.currentPage - 1) * this.gridConfig.gridRequest.Take;
    this.gridRequest.Take = this.paginationConfig.pageSize * this.paginationConfig.currentPage;
    let total = this.filterResponse.total || 0;
    if (this.gridRequest.Take > total && total > 0)
      this.gridRequest.Take = total;
  }

  get gridRequest() {
    return this.gridConfig.gridRequest;
  }

  get filterResponse() {
    return this.gridConfig.filterResponse;
  }

  nextPage() {
    let lastPage = this.paginationConfig.pagesNumber[this.paginationConfig.pagesNumber.length - 1];
    if (this.paginationConfig.currentPage < lastPage) {
      this.paginationConfig.currentPage++;
      if (this.gridConfig.sourceType == SourceType.url)
        this.computeGridRequest();
      this.refreshGrid();
    }
  }

  prevPage() {
    if (this.paginationConfig.currentPage > 1) {
      this.paginationConfig.currentPage--;
      if (this.gridConfig.sourceType == SourceType.url)
        this.computeGridRequest();
      this.refreshGrid();
    }
  }

  selectPage(currentPage: number) {
    this.paginationConfig.currentPage = currentPage;
    if (this.gridConfig.sourceType == SourceType.url)
      this.computeGridRequest();
    this.refreshGrid();
  }

  get paginationConfig() {
    return this.gridConfig.paginationConfig;
  }
  //===================
  //Filtering
  filterDataSource() {
    this.filterConfig?.forEach(filter => {
      this.dataSourceComp = (this.gridConfig.dataSource as Array<Object>).filter((f: any) => {
        if (filter?.Field)
          return f[filter.Field].toLowerCase().includes((filter?.Value as string).toLowerCase());
      }
      );
    });
  }

  addFilter(_filter: GridFilter) {
    let filterIndex = this.filterConfig?.findIndex(f => f.Field === _filter.Field);
    if (_filter?.Value) {
      if (filterIndex < 0)
        this.filterConfig?.push(_filter);
      else
        this.filterConfig[filterIndex] = _filter;
    } else {
      this.filterConfig?.splice(filterIndex, 1);
    } debugger
    this.refreshGrid()
  }

  getColumnFilter(column: string) {
    return this.filterConfig?.find(filter => filter.Field === column);
  }

  get filterConfig() {
    return this.gridConfig.gridRequest.FilterX?.Filters;
  }

  computeNextPrevEn() {
    let currentPage = this.paginationConfig.currentPage;
    let pages = this.paginationConfig.pagesNumber;
    let lastPage = pages[pages.length - 1];
    this.paginationConfig.prevPageEnable = currentPage > 1 ? true : false;
    this.paginationConfig.nextPageEnable = currentPage < lastPage ? true : false;
  }

  //================
  //Sorting
  sortDataSource() {
    this.sortConfig.forEach((sort: GridSort) => {
      this.dataSourceComp = this.gridConfig.dataSource.sort((a: any, b: any) => {
        if (sort.Field) {
          if (sort.Dir === SortMode.desc)
            return (a[sort.Field] < b[sort.Field]) ? 1 : ((b[sort.Field] < a[sort.Field]) ? -1 : 0)
          else
            return (a[sort.Field] > b[sort.Field]) ? 1 : ((b[sort.Field] > a[sort.Field]) ? -1 : 0)
        }
        else
          return 0;
      });
    });
  }

  addSort(_sort: GridSort) {
    let sorts = this.sortConfig;
    let sort = sorts?.find(s => s.Field === _sort.Field);
    if (!sort)
      sorts?.push(_sort);
    else
      sorts.push(...sorts.splice(sorts.findIndex(s => _sort), 1))

    this.refreshGrid();
  }

  getColumnSort(column: string) {
    return this.sortConfig?.find(sort => sort.Field === column);
  }

  get sortConfig() {
    return this.gridConfig.gridRequest.Sort;
  }
  //===============
  //===============
}
