import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionUsuariosPage } from './gestion-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: GestionUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionUsuariosPageRoutingModule {}
