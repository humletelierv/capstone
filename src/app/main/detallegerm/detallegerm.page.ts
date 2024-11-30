import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoGerm } from '../../interface/info-germ';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detallegerm',
  templateUrl: './detallegerm.page.html',
  styleUrls: ['./detallegerm.page.scss'],
})
export class DetallegermPage implements OnInit {
  batch: InfoGerm | undefined; // Batch actual mostrado en la vista
  loading: boolean = true; // Indicador de carga
  private subscriptions: Subscription = new Subscription(); // Para manejar la suscripción del observable

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerBatch();
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones al destruir el componente
    this.subscriptions.unsubscribe();
  }

  // Navegación
  goBack(): void {
    this.router.navigate(['/info-germ']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goUser(): void {
    this.router.navigate(['/configuracion-usuario']);
  }

  // Obtener y filtrar datos del batch
  obtenerBatch(): void {
    const numeroBatch = this.route.snapshot.paramMap.get('NumeroBatch');
    if (!numeroBatch) {
      console.error('Número de batch no proporcionado en la URL');
      this.loading = false;
      return;
    }

    // Suscribirse al servicio para obtener los datos
    const batchSubscription = this.authService.infoGerm().subscribe(
      (batches) => {
        this.batch = this.filtrarBatch(batches, numeroBatch);

        if (!this.batch) {
          console.warn(`Batch con Número ${numeroBatch} no encontrado`);
        }

        this.loading = false; // Detener el indicador de carga
      },
      (error) => {
        console.error('Error al obtener los batches:', error);
        this.loading = false; // Detener el indicador de carga en caso de error
      }
    );

    // Agregar la suscripción al manejador de suscripciones
    this.subscriptions.add(batchSubscription);
  }

  // Filtrar un batch específico por número
  private filtrarBatch(batches: InfoGerm[], numeroBatch: string): InfoGerm | undefined {
    return batches.find((b) => b.batch.toString() === numeroBatch);
  }
}
