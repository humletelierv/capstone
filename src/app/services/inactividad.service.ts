import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';  // Para detectar si la app está en segundo plano
import { AuthService } from './auth.service';  // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;  // ID del temporizador
  private inactivityTime = 1 * 60 * 10000;  // 5 minutos en milisegundos

  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthService
  ) {
    // Detectar si la app entra en segundo plano
    this.platform.pause.subscribe(() => {
      this.startInactivityTimer();
    });

    // Detectar si la app vuelve a primer plano
    this.platform.resume.subscribe(() => {
      this.resetInactivityTimer();
    });
  }

  // Iniciar el temporizador de inactividad
  startInactivityTimer() {
    this.clearTimeout();  // Limpia el temporizador anterior, si existe
    this.timeoutId = setTimeout(() => {
      this.logout();  // Cierra sesión después del tiempo de inactividad
    }, this.inactivityTime);
  }

  // Reiniciar el temporizador si hay actividad
  resetInactivityTimer() {
    this.clearTimeout();
    this.startInactivityTimer();  // Reinicia el temporizador
  }

  // Cierra la sesión y redirige al login
  logout() {
    this.authService.logout();  // Llama al método logout del servicio de autenticación
    this.router.navigateByUrl('/login');  // Redirige al login
  }

  // Limpia el temporizador
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
