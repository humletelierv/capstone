import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./main/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./main/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'configuracion-usuario',
    loadChildren: () => import('./main/configuracion-usuario/configuracion-usuario.module').then( m => m.ConfiguracionUsuarioPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () => import('./main/gestion-usuarios/gestion-usuarios.module').then( m => m.GestionUsuariosPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'estado',
    loadChildren: () => import('./main/estado/estado.module').then( m => m.EstadoPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'detallebatch/:NumeroBatch',  // Ruta con parámetro para los detalles del batch
    loadChildren: () => import('./main/detallebatch/detallebatch.module').then(m => m.DetallebatchPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
