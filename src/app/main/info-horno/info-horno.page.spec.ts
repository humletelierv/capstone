import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoHornoPage } from './info-horno.page';

describe('InfoHornoPage', () => {
  let component: InfoHornoPage;
  let fixture: ComponentFixture<InfoHornoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHornoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
