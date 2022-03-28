export class PaginationConfig {
    constructor(
        public paginationEnable: boolean = true,
        public pageSize: number = 5,
        public currentPage: number = 1,
        public prevPageEnable: boolean = false,
        public nextPageEnable: boolean = true,
        public pagesNumber: Array<number> = new Array<number>()
    ) {
    }
}