import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallebatchPage } from './detallebatch.page';

describe('DetallebatchPage', () => {
  let component: DetallebatchPage;
  let fixture: ComponentFixture<DetallebatchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallebatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
