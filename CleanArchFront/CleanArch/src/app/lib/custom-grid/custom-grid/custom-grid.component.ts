import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThemeMode } from '../../shared/global.enum';
import { SourceType } from '../shared/custom-grid.enum';
import { customGridAnimations } from '../shared/grid.component.animation';
import { GridConfigModel } from '../shared/model/custom-grid-config.model';
import { CustomGridService } from '../shared/service/custom-grid.service';



@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.sass'],
  animations: customGridAnimations
})
export class CustomGridComponent implements OnChanges {
  @Input('dataSource') _dataSource: any;
  @Input('columns') _columns: any;
  @Input('title') _title: string = 'List';
  @Input('accordionId') _accordionId: string = 'accordionExample';
  @Input('striped') _striped: boolean = false;
  @Input('theme') _theme: ThemeMode = ThemeMode.dark;
  @Input('hover') _hover: boolean = false;
  @Input('paginationEnable') _paginationEnable: boolean = true;
  @Input('pageSize') _pageSize: number = 5;
  themeMode = ThemeMode;
  constructor(public _gridService: CustomGridService) { }

  ngOnChanges(changes: SimpleChanges): void {
    let dataSourceType: SourceType = this._gridService.getDataSourceType(this._dataSource);
    switch (dataSourceType as SourceType) {
      case SourceType.array:
        if (this._dataSource?.length > 0) {
          this.init(this._dataSource);
        }
        break;
      case SourceType.observable:
        this._dataSource.subscribe((resuource: any) => {
          if (resuource?.length > 0) {
            this.init(resuource);
          }
        });
        break;
      case SourceType.object:
        break;
      case SourceType.promise:
        break;
      case SourceType.unknown:
        break;
      default:
        break;
    }
  }

  init(dataSource: any) {
    this._gridService.setGridConfigModel(
      new GridConfigModel(
        this._columns,
        dataSource,
        this._title,
        this._striped,
        this._theme,
        this._hover,
        this._paginationEnable,
        this._pageSize
      )
    );

    this._gridService.initColumnsComputed();
    this._gridService.initGrid();
  }

  get gridCompConfig() {
    return this._gridService.gridComputedConfig;
  }

  get gridConfig() {
    return this._gridService.gridConfig;
  }
}
