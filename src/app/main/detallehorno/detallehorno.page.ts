import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { InfoHorno } from '../../interface/info-horno';

@Component({
  selector: 'app-detallehorno',
  templateUrl: './detallehorno.page.html',
  styleUrls: ['./detallehorno.page.scss'],
})
export class DetallehornoPage implements OnInit {
  batch: InfoHorno | undefined;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerBatch();
  }

  goBack() {
    this.router.navigate(['/info-horno']); // Navega a la página 'home' o cualquier página específica
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }

  obtenerBatch() {
    const numeroBatch = this.route.snapshot.paramMap.get('NumeroBatch');

    // Llamada al servicio para obtener los batches
    this.authService.infoHorno().subscribe(
      (batches) => {
        // Filtrar el batch específico según el número recibido en la URL
        this.batch = batches.find(
          (b) => b.batch.toString() === numeroBatch
        );

        if (!this.batch) {
          console.error('Batch no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener los batches:', error);
      }
    );
  }

}
