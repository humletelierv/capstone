import { Component, HostListener, ViewChild  } from '@angular/core';
import { InactivityService } from './services/inactividad.service';  // Importa tu servicio de inactividad
import { IonRouterOutlet, GestureController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private inactivityService: InactivityService,
    private gestureCtrl: GestureController,
    private router: Router,
    private authService: AuthService

  ) {}
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  // Detectar cuando el usuario interactúa con la app
  @HostListener('document:mousemove')
  @HostListener('document:mousedown')
  @HostListener('document:touchstart')
  @HostListener('document:click')
  @HostListener('document:keydown')
  onUserInteraction() {
    this.inactivityService.resetInactivityTimer();  // Reiniciar el temporizador al detectar actividad
  }

  ngOnInit() {
    this.setupGlobalSwipeGesture();  // Configura el gesto global al iniciar
  }

  setupGlobalSwipeGesture() {
    const gesture = this.gestureCtrl.create({
      el: document.body,
      gestureName: 'swipe-to-back-global',
      onStart: () => {
        const currentUrl = this.router.url;  // Obtener la URL actual antes de iniciar el gesto
        console.log('Current URL:', currentUrl);  // Imprimir la URL actual

        // Si la URL actual es /login, deshabilitar el gesto
        if (currentUrl === '/home') {
          gesture.enable(false);  // Deshabilita el gesto si estamos en /login
          this.router.navigate(['/home'])
        } else {
          gesture.enable(true);  // Habilita el gesto si no es /login
        }
      },
      onMove: (ev) => {
        if (ev.deltaX > 150 && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();  // Retrocede si es posible
        }
      },
    });
    gesture.enable(true);  // Inicialmente habilitar el gesto
  }

  async cargarUsuarios() {
    try {
      const usuarios = await this.authService.getUsuarios();
      console.log('Usuarios:', usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }


}
