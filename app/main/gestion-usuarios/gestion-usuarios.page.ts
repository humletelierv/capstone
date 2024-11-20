import { Component, OnInit, ViewChild } from '@angular/core';
import { GestureController } from '@ionic/angular';  // Importar el controlador de gestos
import { IonContent } from '@ionic/angular';  // Necesario para IonContent
import { Router } from '@angular/router';  // Importar Router para la navegación

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;  // Referencia al IonContent

  constructor(
  private gestureCtrl: GestureController,
  private router: Router

  ) { }

  ngOnInit() {
  }



  // // Configuración del gesto de retroceso por deslizamiento
  // async setupGesture() {
  //   const scrollElement = await this.content.getScrollElement();  // Esperar a que la promesa se resuelva
  //   const gesture = this.gestureCtrl.create({
  //     el: scrollElement,  // Pasar el elemento resuelto
  //     gestureName: 'swipe-to-back',
  //     onMove: (ev) => {
  //       if (ev.deltaX > 150) {  // Si el usuario desliza más de 150px hacia la derecha
  //         this.goBack();  // Llamamos a la función de retroceso
  //       }
  //     },
  //   });
  //   gesture.enable(true);  // Habilitar el gesto
  // }

  // // Navegar hacia atrás
  // goBack() {
  //   this.router.navigate(['/home'], { replaceUrl: true });  // Reemplazar la URL para evitar regresar a login
  // }

}

