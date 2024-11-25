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
    path: 'info-tina',
    loadChildren: () => import('./main/info-tina/info-tina.module').then( m => m.InfoTinaPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'detallebatch/:NumeroBatch',  // Ruta con parámetro para los detalles del batch
    loadChildren: () => import('./main/detallebatch/detallebatch.module').then(m => m.DetallebatchPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'procesos',
    loadChildren: () => import('./main/procesos/procesos.module').then( m => m.ProcesosPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard

  },
  {
    path: 'info-horno',
    loadChildren: () => import('./main/info-horno/info-horno.module').then( m => m.InfoHornoPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'info-germ',
    loadChildren: () => import('./main/info-germ/info-germ.module').then( m => m.InfoGermPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'detallehorno/:NumeroBatch',
    loadChildren: () => import('./main/detallehorno/detallehorno.module').then( m => m.DetallehornoPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'info-analisis',
    loadChildren: () => import('./main/info-analisis/info-analisis.module').then( m => m.InfoAnalisisPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },
  {
    path: 'detalle-analisis/:NumeroBatch',
    loadChildren: () => import('./main/detalle-analisis/detalle-analisis.module').then( m => m.DetalleAnalisisPageModule),
    canActivate: [AuthGuard], // Protege la ruta con el AuthGuard
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
