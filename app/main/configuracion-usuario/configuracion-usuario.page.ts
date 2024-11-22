import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.page.html',
  styleUrls: ['./configuracion-usuario.page.scss'],
})
export class ConfiguracionUsuarioPage implements OnInit {
  isAdmin: boolean = false;  // Variable para controlar si el usuario es admin

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
    ) {}

  async ngOnInit() {
    // // Obtener el usuario logueado y verificar el rol
    // const user = await this.authService.getLoggedInUser();
    // if (user) {
    //   this.isAdmin = user.role === 'admin';  // Solo es true si el rol es admin
    // } else {
    //   this.router.navigateByUrl('/login');  // Redirigir si no hay usuario logueado
    // }
  }
  goBack() {
    this.location.back(); // Navegar a la página anterior
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }

  goToGestionUsuarios() {
    if (this.isAdmin) {
      this.router.navigateByUrl('/gestion-usuarios');  // Navegar si es admin
    }
  }

  // Función para cerrar sesión
  async logout() {
    await this.authService.logout();  // Llama al método de logout en AuthService
    this.router.navigateByUrl('/login');  // Redirige a la página de login
  }
}
