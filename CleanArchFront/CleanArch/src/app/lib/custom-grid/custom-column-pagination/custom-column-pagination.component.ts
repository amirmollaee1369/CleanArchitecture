import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-column-pagination',
  templateUrl: './custom-column-pagination.component.html',
  styleUrls: ['./custom-column-pagination.component.sass']
})
export class CustomColumnPaginationComponent implements OnInit {
  @Input('prevPageEnable') prevPageEnable: boolean = false;
  @Input('currentPage') currentPage: number = 1;
  @Input('pageSize') pageSize: number = 5;
  @Input('pagesNumber') pagesNumber: Array<number> = [];
  @Input('nextPageEnable') nextPageEnable: boolean = true;

  @Output('prevPage') prevPage = new EventEmitter();
  @Output('selectPage') selectPage: EventEmitter<number> = new EventEmitter();
  @Output('nextPage') nextPage = new EventEmitter();
  @Output('changePageSize') changePageSize:EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onPrevPage() {
    this.prevPage.emit();
  }

  onSelectPage(page: number) {
    this.selectPage.emit(page);
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onChangePageSize(_pageSize: number) {
    this.changePageSize.emit(_pageSize);
  }
}
