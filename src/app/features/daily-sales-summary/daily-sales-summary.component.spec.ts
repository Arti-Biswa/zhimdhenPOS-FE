import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySalesSummaryComponent } from './daily-sales-summary.component';

describe('DailySalesSummaryComponent', () => {
  let component: DailySalesSummaryComponent;
  let fixture: ComponentFixture<DailySalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailySalesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailySalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
