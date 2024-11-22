import { Component, OnInit, ViewChild } from '@angular/core';
import { GestureController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Tina } from '../../interface/info-tina';

@Component({
  selector: 'app-info-tina',
  templateUrl: './info-tina.page.html',
  styleUrls: ['./info-tina.page.scss'],
})
export class InfoTinaPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  query: string = ''; // Término de búsqueda
  batches: Tina[] = []; // Lista de batches cargados
  batchesFiltrados: Tina[] = []; // Lista de batches después de aplicar el filtro
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

  async ngOnInit() {
    await this.setupGesture();
    this.cargarBatches();
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

<<<<<<< HEAD
  // Métodos para los botones
  goBack() {
    this.router.navigate(['/home']); // Ruta para "Volver"
  }

  goHome() {
    this.router.navigate(['/home']); // Ruta para "Inicio"
  }

  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Ruta para "Usuario"
  }

=======
>>>>>>> master
  // Método para cargar los datos
  cargarBatches() {
    this.authService.getInfoTina().subscribe(
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

<<<<<<< HEAD
=======


>>>>>>> master
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

  filtrarPorFecha() {
    if (this.fechaFiltro) {
      const fechaSeleccionada = new Date(this.fechaFiltro).toISOString().split('T')[0];
      this.fechasFiltradas = this.fechasUnicas.filter(fecha => fecha === fechaSeleccionada);
    } else {
      this.fechasFiltradas = [...this.fechasUnicas]; // Mostrar todas si no hay filtro
    }
  }

  obtenerFechasUnicas(batches: Tina[]): string[] {
    const fechas = batches.map((batch) => batch.fecha);
    return Array.from(new Set(fechas.map((fecha) => new Date(fecha).toISOString().split('T')[0])));
  }

  getBatchesPorFecha(fecha: string): Tina[] {
<<<<<<< HEAD
=======
    // Filtra primero por la fecha
>>>>>>> master
    let batchesFiltradosPorFecha = this.batches.filter(
      (batch) => new Date(batch.fecha).toISOString().split('T')[0] === fecha
    );

<<<<<<< HEAD
=======
    // Si hay un término de búsqueda (query), aplica el filtro adicional por número de batch
>>>>>>> master
    if (this.query) {
      const query = this.query.toString().toLowerCase();
      batchesFiltradosPorFecha = batchesFiltradosPorFecha.filter((batch) =>
        batch.batch.toString().toLowerCase().includes(query)
      );
    }

<<<<<<< HEAD
    return batchesFiltradosPorFecha;
  }

=======
    // Retorna el resultado, incluso si es un arreglo vacío
    return batchesFiltradosPorFecha;
  }


>>>>>>> master
  toggleCard(index: number) {
    this.cardOpenStates = this.cardOpenStates.map((_, i) =>
      i === index ? !this.cardOpenStates[i] : false
    );
  }

  isCardOpen(index: number): boolean {
    return this.cardOpenStates[index];
  }

<<<<<<< HEAD
=======
  goBack() {
    this.router.navigate(['/procesos']); // Navega a la página 'home' o cualquier página específica
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }

>>>>>>> master
  goToBatchDetails(batch: Tina) {
    this.router.navigate(['/detallebatch', batch.batch]);
  }

  getEstadoTinaDescripcion(id_estado_tina: number): string {
    const estadosTina: { [key: number]: string } = {
      1: 'Seco',
      2: 'Húmedo',
    };
    return estadosTina[id_estado_tina] || 'Desconocido';
  }
<<<<<<< HEAD
=======


>>>>>>> master
}
