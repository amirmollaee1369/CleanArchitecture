import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColumnPaginationComponent } from './custom-column-pagination.component';

describe('CustomColumnPaginationComponent', () => {
  let component: CustomColumnPaginationComponent;
  let fixture: ComponentFixture<CustomColumnPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomColumnPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColumnPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
