import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAnalisisPage } from './detalle-analisis.page';

describe('DetalleAnalisisPage', () => {
  let component: DetalleAnalisisPage;
  let fixture: ComponentFixture<DetalleAnalisisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAnalisisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
