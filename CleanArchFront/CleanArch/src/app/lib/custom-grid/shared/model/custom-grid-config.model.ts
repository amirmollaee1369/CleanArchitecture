import { ThemeMode } from "src/app/lib/shared/global.enum";
import { SortMode } from "../custom-grid.enum";
import { ColumnModel } from "./custom-grid-column.model";

export class GridConfigModel{

    constructor(
      public columns:Array<string>=new Array<string>(),
      public dataSource: any=[],
      public title: string='List',
      public striped: boolean=false,
      public theme: ThemeMode=ThemeMode.dark,
      public hover: boolean=true,
      public paginationEnable: boolean=true,
      public pageSize: number=5,
     
    ) {
        
    }
}