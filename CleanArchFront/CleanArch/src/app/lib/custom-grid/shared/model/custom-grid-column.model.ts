import { SortMode } from "../custom-grid.enum";

export class ColumnModel {
  constructor(
    public name?: string ,
    public sort?: boolean ,
    public sortMode?: SortMode
  ) { }
}