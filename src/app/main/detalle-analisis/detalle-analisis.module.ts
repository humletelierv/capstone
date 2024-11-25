import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAnalisisPageRoutingModule } from './detalle-analisis-routing.module';

import { DetalleAnalisisPage } from './detalle-analisis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAnalisisPageRoutingModule
  ],
  declarations: [DetalleAnalisisPage]
})
export class DetalleAnalisisPageModule {}
