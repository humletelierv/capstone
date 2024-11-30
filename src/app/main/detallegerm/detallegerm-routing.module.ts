import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallegermPage } from './detallegerm.page';

const routes: Routes = [
  {
    path: '',
    component: DetallegermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallegermPageRoutingModule {}
