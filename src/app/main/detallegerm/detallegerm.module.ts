import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallegermPageRoutingModule } from './detallegerm-routing.module';

import { DetallegermPage } from './detallegerm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallegermPageRoutingModule
  ],
  declarations: [DetallegermPage]
})
export class DetallegermPageModule {}
