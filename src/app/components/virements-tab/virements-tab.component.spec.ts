import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementsTabComponent } from './virements-tab.component';

describe('VirementsTabComponent', () => {
  let component: VirementsTabComponent;
  let fixture: ComponentFixture<VirementsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirementsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
