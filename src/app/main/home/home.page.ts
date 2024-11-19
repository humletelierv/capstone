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
  logout() {
    this.authService.logout();  // Llama al método de logout en AuthService
    this.router.navigateByUrl('/login');  // Redirige a la página de login
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }

  // Función para navegar a la página de Configuración de Usuario
  goToConfiguracionUsuario() {
    this.router.navigateByUrl('/configuracion-usuario');
  }

  // Función para navegar a la página Estado
  goToEstado() {
    this.router.navigateByUrl('/estado');
  }

   // Función para navegar a la página Estado
   goToProcesos() {
    this.router.navigateByUrl('/procesos');
  }

  goToInformes() {
    console.log('Redirigiendo a Informes');  // Implementar la navegación más tarde
  }
}
