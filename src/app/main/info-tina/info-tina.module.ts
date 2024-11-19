import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoTinaPageRoutingModule } from './info-tina-routing.module';

import { InfoTinaPage } from './info-tina.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoTinaPageRoutingModule,
    SharedModule
  ],
  declarations: [InfoTinaPage]
})
export class InfoTinaPageModule {}
