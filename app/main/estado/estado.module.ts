import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EstadoPageRoutingModule } from './estado-routing.module';
import { EstadoPage } from './estado.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EstadoPageRoutingModule
  ],
  declarations: [EstadoPage]
})
export class EstadoPageModule {}
