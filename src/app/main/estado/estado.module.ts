import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoPageRoutingModule } from './estado-routing.module';

import { EstadoPage } from './estado.page';
import { OrderByPipe } from '../pipes/order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoPageRoutingModule
  ],
  declarations: [EstadoPage, OrderByPipe]
})
export class EstadoPageModule {}
