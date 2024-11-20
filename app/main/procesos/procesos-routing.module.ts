import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesosPage } from './procesos.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesosPageRoutingModule {}
