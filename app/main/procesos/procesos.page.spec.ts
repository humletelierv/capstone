import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcesosPage } from './procesos.page';

describe('ProcesosPage', () => {
  let component: ProcesosPage;
  let fixture: ComponentFixture<ProcesosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
