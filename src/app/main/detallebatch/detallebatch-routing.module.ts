import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallebatchPage } from './detallebatch.page';

const routes: Routes = [
  {
    path: '',
    component: DetallebatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallebatchPageRoutingModule {}
