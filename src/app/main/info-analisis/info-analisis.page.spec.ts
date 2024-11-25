import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoAnalisisPage } from './info-analisis.page';

describe('InfoAnalisisPage', () => {
  let component: InfoAnalisisPage;
  let fixture: ComponentFixture<InfoAnalisisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAnalisisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
