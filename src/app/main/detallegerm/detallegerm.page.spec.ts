import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallegermPage } from './detallegerm.page';

describe('DetallegermPage', () => {
  let component: DetallegermPage;
  let fixture: ComponentFixture<DetallegermPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallegermPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
