import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallehornoPageRoutingModule } from './detallehorno-routing.module';

import { DetallehornoPage } from './detallehorno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallehornoPageRoutingModule
  ],
  declarations: [DetallehornoPage]
})
export class DetallehornoPageModule {}
