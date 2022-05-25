import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderRowComponent } from './page-header-row.component';

describe('PageHeaderRowComponent', () => {
  let component: PageHeaderRowComponent;
  let fixture: ComponentFixture<PageHeaderRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
