import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAnalisisPage } from './info-analisis.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAnalisisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAnalisisPageRoutingModule {}
