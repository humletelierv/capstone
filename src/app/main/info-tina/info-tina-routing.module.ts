import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoTinaPage } from './info-tina.page';

const routes: Routes = [
  {
    path: '',
    component: InfoTinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoTinaPageRoutingModule {}
