import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoHornoPageRoutingModule } from './info-horno-routing.module';

import { InfoHornoPage } from './info-horno.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoHornoPageRoutingModule,
    SharedModule
  ],
  declarations: [InfoHornoPage]
})
export class InfoHornoPageModule {}
