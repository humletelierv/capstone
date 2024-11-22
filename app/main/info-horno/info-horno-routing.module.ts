import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoHornoPage } from './info-horno.page';

const routes: Routes = [
  {
    path: '',
    component: InfoHornoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoHornoPageRoutingModule {}
