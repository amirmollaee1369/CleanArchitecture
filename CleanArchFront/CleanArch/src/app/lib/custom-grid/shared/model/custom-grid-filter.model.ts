import { FilterLogic } from "../custom-grid.enum";

export class GridFilter{
    constructor(
        public Operator?:string,
        public Field?:string,
        public Value?:string,
        public Logic:FilterLogic=FilterLogic.and,
        public Filters:Array<GridFilter>=new Array<GridFilter>()
    ) {
    }
}