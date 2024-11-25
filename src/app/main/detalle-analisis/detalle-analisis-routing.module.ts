import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAnalisisPage } from './detalle-analisis.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAnalisisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAnalisisPageRoutingModule {}
