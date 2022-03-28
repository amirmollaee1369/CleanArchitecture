import { Observable } from "rxjs";
import { ThemeMode } from "src/app/lib/shared/global.enum";
import { SourceType } from "../custom-grid.enum";
import { FilterResponse } from "./custom-grid-filter-response.model";
import { PaginationConfig } from "./custom-grid-pagination-config.model";
import { GridRequest } from "./custom-grid-request.model";
export class GridConfigModel{

    constructor(
      public sourceType: SourceType=SourceType.observable,
      public columns:Array<string>=new Array<string>(),
      public dataSource: Array<Object> = new Array(),
      public dataSourceUrl:string='',
      public token:string='',
      public title: string='List',
      public striped: boolean=false,
      public theme: ThemeMode=ThemeMode.dark,
      public hover: boolean=true,
      public paginationConfig:PaginationConfig=new PaginationConfig(),
      public gridRequest:GridRequest=new GridRequest(),
      public filterResponse:FilterResponse=new FilterResponse(),

    ) {
        
    }
}