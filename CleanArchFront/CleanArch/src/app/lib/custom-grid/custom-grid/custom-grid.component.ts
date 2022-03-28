import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeMode } from '../../shared/global.enum';
import { SourceType } from '../shared/custom-grid.enum';
import { customGridAnimations } from '../shared/grid.component.animation';
import { GridConfigModel } from '../shared/model/custom-grid-config.model';
import { GridFilter } from '../shared/model/custom-grid-filter.model';
import { PaginationConfig } from '../shared/model/custom-grid-pagination-config.model';
import { GridRequest } from '../shared/model/custom-grid-request.model';
import { GridSort } from '../shared/model/custom-grid-sort.model';
import { CustomGridService } from '../shared/service/custom-grid.service';



@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.sass'],
  animations: customGridAnimations,
  providers:[CustomGridService]
})
export class CustomGridComponent implements OnChanges {
  //Inputs
  @Input('sourceType') _sourceType: SourceType = SourceType.observable;
  @Input('dataSource') _dataSource: Observable<any> = new Observable<any>();
  @Input('dataSourceUrl') _dataSourceUrl: string = '';
  @Input('token') _token: string = '';
  @Input('columns') _columns: Array<string>=new Array<string>();
  @Input('title') _title: string = 'List';
  @Input('accordionId') _accordionId: string = 'accordionExample';
  @Input('striped') _striped: boolean = false;
  @Input('theme') _theme: ThemeMode = ThemeMode.dark;
  @Input('hover') _hover: boolean = false;
  @Input('paginationEnable') _paginationEnable: boolean = true;
  @Input('serverSidePaginationEnable') _serverSidePaginationEnable: boolean = true;
  @Input('pageSize') _pageSize: number = 5;
  //=========
  //Enums
  themeMode = ThemeMode;
  
  //=========
  constructor(public _gridService: CustomGridService) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    switch (this._sourceType) {
      case SourceType.observable:
        if (changes["_dataSource"] && this._dataSource) {
          this._dataSource.subscribe((result) => {
            this.initGridConfig(result);
          });
        }
        break;
      case SourceType.url:
        if (changes["_dataSourceUrl"] && this._dataSourceUrl != null)
          this.initGridConfig([]);
        break;
    }
  }

  initGridConfig(dataSource: Array<Object> = new Array()) {
    this._gridService.initGrid(
      new GridConfigModel(
        this._sourceType,
        this._columns,
        dataSource,
        this._dataSourceUrl,
        this._token,
        this._title,
        this._striped,
        this._theme,
        this._hover,
        new PaginationConfig(
          this._paginationEnable,
          this._pageSize,
          1,false,true
        ),
        new GridRequest(
          this._pageSize,0,
          new GridFilter(),
          new Array<GridSort>()
        )
      )
    );
  }


  get gridConfig() {
    return this._gridService.gridConfig;
  }
}
