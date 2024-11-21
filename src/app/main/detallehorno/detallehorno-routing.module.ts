import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallehornoPage } from './detallehorno.page';

const routes: Routes = [
  {
    path: '',
    component: DetallehornoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallehornoPageRoutingModule {}
