import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoAnalisisPageRoutingModule } from './info-analisis-routing.module';

import { InfoAnalisisPage } from './info-analisis.page';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoAnalisisPageRoutingModule,
    SharedModule
  ],
  declarations: [InfoAnalisisPage]
})
export class InfoAnalisisPageModule {}
