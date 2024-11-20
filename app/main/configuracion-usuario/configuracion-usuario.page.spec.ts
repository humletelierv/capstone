import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracionUsuarioPage } from './configuracion-usuario.page';

describe('ConfiguracionUsuarioPage', () => {
  let component: ConfiguracionUsuarioPage;
  let fixture: ComponentFixture<ConfiguracionUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
