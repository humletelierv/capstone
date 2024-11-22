import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';  // Importar Observable para el nombre de usuario reactivo
>>>>>>> master

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.page.html',
  styleUrls: ['./procesos.page.scss'],
})
export class ProcesosPage implements OnInit {
<<<<<<< HEAD

  constructor() { }

  ngOnInit() {
  }

}
=======
    username$: Observable<string>;  // Observable para manejar el nombre de usuario reactivo

    constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username$ = this.authService.username$;  // Suscribimos el observable al BehaviorSubject del AuthService
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
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }

}

>>>>>>> master
