import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Batch } from '../../interface/batch';

@Component({
  selector: 'app-detallebatch',
  templateUrl: './detallebatch.page.html',
  styleUrls: ['./detallebatch.page.scss'],
})
export class DetallebatchPage implements OnInit {
  batch: Batch | undefined;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerBatch();
  }

  obtenerBatch() {
    const numeroBatch = this.route.snapshot.paramMap.get('NumeroBatch');

    // Llamada al servicio para obtener los batches
    this.authService.getBatches().subscribe(
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
