import { SortMode } from "../custom-grid.enum";

export class GridSort {
    constructor(
        public Field?: string,
        public Dir?: SortMode) {
    }
}
