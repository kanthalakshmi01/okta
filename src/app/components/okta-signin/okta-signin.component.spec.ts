import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaSigninComponent } from './okta-signin.component';

describe('OktaSigninComponent', () => {
  let component: OktaSigninComponent;
  let fixture: ComponentFixture<OktaSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OktaSigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OktaSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
