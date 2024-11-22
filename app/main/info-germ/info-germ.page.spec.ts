import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoGermPage } from './info-germ.page';

describe('InfoGermPage', () => {
  let component: InfoGermPage;
  let fixture: ComponentFixture<InfoGermPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGermPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
