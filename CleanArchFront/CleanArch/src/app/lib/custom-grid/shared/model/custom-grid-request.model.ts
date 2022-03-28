import { GridFilter } from "./custom-grid-filter.model";
import { GridSort } from "./custom-grid-sort.model";

export class GridRequest{
    constructor(
        public Take:number=0,
        public Skip:number=0,
        public FilterX:GridFilter=new GridFilter(),
        public Sort:Array<GridSort>=new Array<GridSort>()) {
    }
    
}