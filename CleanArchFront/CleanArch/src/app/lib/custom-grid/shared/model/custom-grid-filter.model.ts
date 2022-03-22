import { ColumnModel } from "./custom-grid-column.model";

export class FilterModel{
    constructor(
        public columnModel:ColumnModel=new ColumnModel(),
        public filterValue?:string
    ){

    }
}