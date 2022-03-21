import { SortMode } from "../custom-grid.enum";
import { ColumnModel } from "./custom-grid-column.model";

export class GridComputedConfigModel {

  constructor(
    //Columns Computed
    public columns: Array<ColumnModel> = new Array<ColumnModel>(),
    public pagesNumber: Array<number> = new Array<number>(),
    //DataSource Computed
    public dataSource?: any,
    //Loader Config Prop
    public showLoader: boolean = true,
    //Paging Config Prop
    public currentPage: number = 1,
    public nextPageEnable: boolean = true,
    public prevPageEnable: boolean = false,
    public sortMode = SortMode,
  ) {
  }
}