import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierSideComponent } from './cashier-side.component';

describe('CashierSideComponent', () => {
  let component: CashierSideComponent;
  let fixture: ComponentFixture<CashierSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
