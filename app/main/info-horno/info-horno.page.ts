import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestureController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InfoHorno } from '../../interface/info-horno';

@Component({
  selector: 'app-info-horno',
  templateUrl: './info-horno.page.html',
  styleUrls: ['./info-horno.page.scss'],
})
export class InfoHornoPage implements OnInit {
  //Variables
  timeout: any; // Para almacenar el timeout
  batches: InfoHorno[] = []; // Lista de batches cargados
  batchesFiltrados: InfoHorno[] = []; // Lista de batches después de aplicar el filtro
  fechasUnicas: string[] = [];
  fechasFiltradas: string[] = []; // Fechas después de aplicar el filtro
  cardOpenStates: boolean[] = []; // Estados de las tarjetas
  errorMessage: string | null = null; // Mensaje de error si falla la carga
  loading: boolean = true; // Estado de carga
  query: string = ''; // Término de búsqueda
  fechaFiltro: string | null = null; // Fecha seleccionada en el filtro

  constructor(
    private gestureCtrl: GestureController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarBatches();
  }

  goBack() {
    this.router.navigate(['/procesos']); // Navega a la página 'home' o cualquier página específica
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }

  buscarBatch(event: any) {
    const query = event.target.value?.toString().toLowerCase() || ''; // Convertir la entrada a cadena y minúsculas
    this.batchesFiltrados = this.batches.filter((batch) =>
      batch.batch.toString().toLowerCase().includes(query)
    );
    if (this.batchesFiltrados.length === 0) {
      this.errorMessage = 'No se encontraron Batches para este número';
    } else {
      this.errorMessage = null;
    }
  }

  reiniciarFiltros() {
    this.query = ''; // Limpia el término de búsqueda
    this.batchesFiltrados = [...this.batches]; // Restaura todos los batches
    this.errorMessage = null; // Limpia el mensaje de error
  }

  // Método para cargar los datos
  cargarBatches() {
    this.authService.infoHorno().subscribe(
      (batches) => {
        clearTimeout(this.timeout); // Cancela el temporizador si los datos se cargan
        this.batches = batches;
        this.batchesFiltrados = [...this.batches]; // Inicialmente todos los batches están disponibles
        this.fechasUnicas = this.obtenerFechasUnicas(batches);
        this.fechasFiltradas = [...this.fechasUnicas]; // Inicialmente todas las fechas están disponibles
        this.cardOpenStates = Array(this.fechasFiltradas.length).fill(false);
        if (this.batches.length === 0) {
          this.errorMessage = 'No se encontraron Batches';
        } else {
          this.errorMessage = null;
        }
        this.loading = false; // Detiene el spinner
      },
      (error) => {
        clearTimeout(this.timeout); // Cancela el temporizador si hay un error
        console.error('Error al obtener los batches:', error);
        this.errorMessage = 'No se pudo cargar la información. Intente nuevamente.';
        this.loading = false; // Detenemos el estado de carga
      }
    );
  }

  obtenerFechasUnicas(batches: InfoHorno[]): string[] {
    const fechas = batches.map((batch) => batch.fecha);
    return Array.from(new Set(fechas.map((fecha) => new Date(fecha).toISOString().split('T')[0])));
  }

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      const fechaSeleccionada = new Date(this.fechaFiltro).toISOString().split('T')[0];
      this.fechasFiltradas = this.fechasUnicas.filter(fecha => fecha === fechaSeleccionada);
    } else {
      this.fechasFiltradas = [...this.fechasUnicas]; // Mostrar todas si no hay filtro
    }
  }

  toggleCard(index: number) {
    this.cardOpenStates = this.cardOpenStates.map((_, i) =>
      i === index ? !this.cardOpenStates[i] : false
    );
  }

  isCardOpen(index: number): boolean {
    return this.cardOpenStates[index];
  }

  getBatchesPorFecha(fecha: string): InfoHorno[] {
    // Filtra primero por la fecha
    let batchesFiltradosPorFecha = this.batches.filter(
      (batch) => new Date(batch.fecha).toISOString().split('T')[0] === fecha
    );

    // Si hay un término de búsqueda (query), aplica el filtro adicional por número de batch
    if (this.query) {
      const query = this.query.toString().toLowerCase();
      batchesFiltradosPorFecha = batchesFiltradosPorFecha.filter((batch) =>
        batch.batch.toString().toLowerCase().includes(query)
      );
    }

    // Retorna el resultado, incluso si es un arreglo vacío
    return batchesFiltradosPorFecha;
  }

  goToBatchDetails(batch: InfoHorno) {
    this.router.navigate(['/detallehorno', batch.batch]);
  }

}
