import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGridComponent } from './custom-grid.component';

describe('CustomGridComponent', () => {
  let component: CustomGridComponent;
  let fixture: ComponentFixture<CustomGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
