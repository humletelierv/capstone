import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoGermPage } from './info-germ.page';

const routes: Routes = [
  {
    path: '',
    component: InfoGermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoGermPageRoutingModule {}
