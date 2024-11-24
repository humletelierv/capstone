import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallehornoPage } from './detallehorno.page';

describe('DetallehornoPage', () => {
  let component: DetallehornoPage;
  let fixture: ComponentFixture<DetallehornoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallehornoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
