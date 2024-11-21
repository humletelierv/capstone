import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoGermPageRoutingModule } from './info-germ-routing.module';

import { InfoGermPage } from './info-germ.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoGermPageRoutingModule,
    SharedModule
  ],
  declarations: [InfoGermPage]
})
export class InfoGermPageModule {}
