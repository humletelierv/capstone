import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoPage } from './estado.page';

describe('EstadoPage', () => {
  let component: EstadoPage;
  let fixture: ComponentFixture<EstadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
