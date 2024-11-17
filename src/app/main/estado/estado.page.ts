import { Component, OnInit, ViewChild } from '@angular/core';
import { GestureController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Batch } from '../../interface/batch';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
})
export class EstadoPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  batches: Batch[] = [];  // Lista de batches cargados
  fechasUnicas: string[] = [];
  fechasFiltradas: string[] = []; // Fechas después de aplicar el filtro
  fechaFiltro: string | null = null; // Fecha seleccionada en el filtro
  cardOpenStates: boolean[] = []; // Estados de las tarjetas

  constructor(
    private gestureCtrl: GestureController,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.setupGesture();
    this.obtenerBatches();
  }

  // Configurar el gesto de retroceso por deslizamiento
  async setupGesture() {
    const scrollElement = await this.content.getScrollElement();
    const gesture = this.gestureCtrl.create({
      el: scrollElement,
      gestureName: 'swipe-to-back',
      onMove: (ev) => {
        if (ev.deltaX > 150) {
          this.goBack();
        }
      },
    });
    gesture.enable(true);
  }

  // Navegar hacia atrás
  goBack() {
    this.router.navigate(['/home']);
  }

  // Navegar a los detalles de un batch específico
  goToBatchDetails(batch: Batch) {
    this.router.navigate(['/detallebatch', batch.batch]);
  }

  obtenerBatches() {
    this.authService.getBatches().subscribe(
      (batches) => {
        console.log('Batches obtenidos:', batches);
        this.batches = batches;
        this.fechasUnicas = this.obtenerFechasUnicas(batches);
        this.fechasFiltradas = [...this.fechasUnicas]; // Inicialmente todas las fechas están disponibles
        this.cardOpenStates = Array(this.fechasFiltradas.length).fill(false);
      },
      (error) => {
        console.error('Error al obtener los batches:', error);
      }
    );
  }

  obtenerFechasUnicas(batches: Batch[]): string[] {
    const fechas = batches.map((batch) => batch.fecha_horneo);
    return Array.from(new Set(fechas.map((fecha) => new Date(fecha).toISOString().split('T')[0])));
  }

  getBatchesPorFecha(fecha: string): Batch[] {
    return this.batches.filter(
      (batch) => new Date(batch.fecha_horneo).toISOString().split('T')[0] === fecha
    );
  }

  toggleCard(index: number) {
    this.cardOpenStates = this.cardOpenStates.map((_, i) => i === index ? !this.cardOpenStates[i] : false);
  }

  isCardOpen(index: number): boolean {
    return this.cardOpenStates[index];
  }

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      const fechaSeleccionada = new Date(this.fechaFiltro).toISOString().split('T')[0];
      this.fechasFiltradas = this.fechasUnicas.filter(fecha => fecha === fechaSeleccionada);
    } else {
      this.fechasFiltradas = [...this.fechasUnicas]; // Mostrar todas si no hay filtro
    }
  }


}


