import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.page.html',
  styleUrls: ['./configuracion-usuario.page.scss'],
})
export class ConfiguracionUsuarioPage implements OnInit {
  isAdmin: boolean = false;  // Variable para controlar si el usuario es admin

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    // // Obtener el usuario logueado y verificar el rol
    // const user = await this.authService.getLoggedInUser();
    // if (user) {
    //   this.isAdmin = user.role === 'admin';  // Solo es true si el rol es admin
    // } else {
    //   this.router.navigateByUrl('/login');  // Redirigir si no hay usuario logueado
    // }
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


  openSocial(platform: string) {
    const urls = {
      facebook: 'https://www.facebook.com',
      twitter: 'https://www.twitter.com',
      instagram: 'https://www.instagram.com',
      linkedin: 'https://www.linkedin.com',
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  }





}
