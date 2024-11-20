import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoTinaPage } from './info-tina.page';

describe('InfoTinaPage', () => {
  let component: InfoTinaPage;
  let fixture: ComponentFixture<InfoTinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
