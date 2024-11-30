import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InfoGerm } from '../../interface/info-germ';
import { AuthService } from '../../services/auth.service';
import { GestureController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-info-germ',
  templateUrl: './info-germ.page.html',
  styleUrls: ['./info-germ.page.scss'],
})
export class InfoGermPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  query: string = ''; // Término de búsqueda
  batches: InfoGerm[] = []; // Lista de batches cargados
  batchesFiltrados: InfoGerm[] = []; // Lista de batches después de aplicar el filtro
  fechasUnicas: string[] = [];
  fechasFiltradas: string[] = []; // Fechas después de aplicar el filtro
  fechaFiltro: string | null = null; // Fecha seleccionada en el filtro
  cardOpenStates: boolean[] = []; // Estados de las tarjetas
  loading: boolean = true; // Estado de carga
  errorMessage: string | null = null; // Mensaje de error si falla la carga
  timeout: any; // Para almacenar el timeout

  constructor(
    private gestureCtrl: GestureController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarBatches();
  }

   // Método para cargar los datos
   cargarBatches() {
    this.authService.infoGerm().subscribe(
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

  obtenerFechasUnicas(batches: InfoGerm[]): string[] {
    const fechas = batches.map((batch) => batch.fecha);
    return Array.from(new Set(fechas.map((fecha) => new Date(fecha).toISOString().split('T')[0])));
  }

  reiniciarFiltros() {
    this.query = ''; // Limpia el término de búsqueda
    this.batchesFiltrados = [...this.batches]; // Restaura todos los batches
    this.errorMessage = null; // Limpia el mensaje de error
  }

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      const fechaSeleccionada = new Date(this.fechaFiltro).toISOString().split('T')[0];
      this.fechasFiltradas = this.fechasUnicas.filter(fecha => fecha === fechaSeleccionada);
    } else {
      this.fechasFiltradas = [...this.fechasUnicas]; // Mostrar todas si no hay filtro
    }
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

  getBatchesPorFecha(fecha: string): InfoGerm[] {
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
toggleCard(index: number) {
  this.cardOpenStates = this.cardOpenStates.map((_, i) =>
    i === index ? !this.cardOpenStates[i] : false
  );
}

isCardOpen(index: number): boolean {
  return this.cardOpenStates[index];
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
goToBatchDetails(batch: InfoGerm) {
  this.router.navigate(['/detallegerm', batch.batch]);
}

}
