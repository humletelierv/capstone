import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionUsuarioPage } from './configuracion-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionUsuarioPageRoutingModule {}
