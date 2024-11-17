import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';  // Importar Router para la navegación
import { Observable } from 'rxjs';  // Importar Observable para el nombre de usuario reactivo

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username$: Observable<string>;  // Observable para manejar el nombre de usuario reactivo

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username$ = this.authService.username$;  // Suscribimos el observable al BehaviorSubject del AuthService
  }

  // Función para navegar a la página de Configuración de Usuario
  goToConfiguracionUsuario() {
    this.router.navigateByUrl('/configuracion-usuario');
  }

  // Función para navegar a la página Estado
  goToEstado() {
    this.router.navigateByUrl('/estado');
  }

  // Las funciones goToProcesos y goToInformes se pueden implementar más tarde
  goToProcesos() {
    console.log('Redirigiendo a Procesos');  // Implementar la navegación más tarde
  }

  goToInformes() {
    console.log('Redirigiendo a Informes');  // Implementar la navegación más tarde
  }
}
