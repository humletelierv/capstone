import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';  // Importar Observable para el nombre de usuario reactivo

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.page.html',
  styleUrls: ['./procesos.page.scss'],
})
export class ProcesosPage implements OnInit {

  username$: Observable<string>;  // Observable para manejar el nombre de usuario reactivo

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  // Función para navegar a la página Estado
  goToInfoTina() {
    this.router.navigateByUrl('/info-tina');
  }
  // Función para navegar a la página Estado
  goToInfoHorno() {
    this.router.navigateByUrl('/info-horno');
  }
  // Función para navegar a la página Estado
  goToInfoGerm() {
    this.router.navigateByUrl('/info-germ');
  }

  goBack() {
    this.router.navigate(['/home']); // Ruta para "Volver"
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }
}
