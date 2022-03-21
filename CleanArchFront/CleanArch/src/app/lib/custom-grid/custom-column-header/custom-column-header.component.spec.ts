import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColumnHeaderComponent } from './custom-column-header.component';

describe('CustomColumnHeaderComponent', () => {
  let component: CustomColumnHeaderComponent;
  let fixture: ComponentFixture<CustomColumnHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomColumnHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
