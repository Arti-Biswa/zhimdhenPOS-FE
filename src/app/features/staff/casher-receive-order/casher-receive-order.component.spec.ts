import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasherReceiveOrderComponent } from './casher-receive-order.component';

describe('CasherReceiveOrderComponent', () => {
  let component: CasherReceiveOrderComponent;
  let fixture: ComponentFixture<CasherReceiveOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasherReceiveOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasherReceiveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
