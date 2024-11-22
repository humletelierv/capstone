import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallebatchPageRoutingModule } from './detallebatch-routing.module';

import { DetallebatchPage } from './detallebatch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallebatchPageRoutingModule
  ],
  declarations: [DetallebatchPage]
})
export class DetallebatchPageModule {}
