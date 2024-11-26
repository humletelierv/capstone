import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.page.html',
  styleUrls: ['./configuracion-usuario.page.scss'],
})
export class ConfiguracionUsuarioPage implements OnInit {
  isAdmin: boolean = false; // Variable para controlar si el usuario es admin
  private apiUrl = 'http://34.176.172.96/api';  // URL de la API de Django
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private renderer: Renderer2, // Inyectar Renderer2 para manipular el DOM
    private storage: Storage,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const userId = await this.storage.get('id'); // Obtén el id del usuario
    if (userId) {
      const userData = await this.authService.getUserDetails(userId);
      this.isAdmin = userData.role === 'admin';
    }
  }

  // Navegar a la página anterior
  goBack() {
    this.location.back();
  }

  // Navegar a la página de inicio
  goHome() {
    this.router.navigate(['/home']);
  }

  // Navegar a la gestión de usuarios si el usuario es admin
  goToGestionUsuarios() {
    if (this.isAdmin) {
      this.router.navigateByUrl('/gestion-usuarios');
    }
  }

  // Función para cerrar sesión
  async logout() {
    // Seleccionar el footer usando Renderer2
    const footer = document.querySelector('.footer');
    if (footer) {
      this.renderer.setStyle(footer, 'display', 'none'); // Ocultar el footer
    }

    // Realiza el logout y redirige a la página de login
    await this.authService.logout();
    this.router.navigateByUrl('/login');

    // Opcional: Restaurar el footer después de redirigir
    setTimeout(() => {
      if (footer) {
        this.renderer.removeStyle(footer, 'display'); // Restaurar la visibilidad
      }
    }, 500); // Ajusta el tiempo según sea necesario
  }
}
