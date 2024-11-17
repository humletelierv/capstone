import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionUsuariosPageRoutingModule } from './gestion-usuarios-routing.module';

import { GestionUsuariosPage } from './gestion-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionUsuariosPageRoutingModule
  ],
  declarations: [GestionUsuariosPage]
})
export class GestionUsuariosPageModule {}
