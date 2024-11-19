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
  query: string = ''; // Término de búsqueda
  batches: Batch[] = [];  // Lista de batches cargados
  batchesFiltrados: Batch[] = []; // Lista de batches después de aplicar el filtro
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
    this.cargarBatchesConTimeout();
  }
  goBack() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
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

  // Método para cargar los datos con un tiempo límite de 15 segundos
  cargarBatchesConTimeout() {
    // Inicia un temporizador de 15 segundos
    this.timeout = setTimeout(() => {
      if (this.loading) {
        this.errorMessage = 'No se pudo encontrar la información';
        this.loading = false; // Detenemos el estado de carga
      }
    }, 15000);

    // Llama al método para obtener los datos
    this.obtenerBatches();
  }

  obtenerBatches() {
    this.authService.getBatches().subscribe(
      (batches) => {
        console.log('Batches obtenidos:', batches); // Verifica los datos recibidos
        this.batches = batches;
        this.batchesFiltrados = [...this.batches];
        this.fechasUnicas = this.obtenerFechasUnicas(batches);
        this.fechasFiltradas = [...this.fechasUnicas];
        console.log('Fechas únicas:', this.fechasUnicas); // Verifica las fechas únicas
        console.log('Fechas filtradas:', this.fechasFiltradas); // Verifica las fechas filtradas
        this.cardOpenStates = Array(this.fechasFiltradas.length).fill(false);
        this.loading = false; // Detenemos el spinner
      },
      (error) => {
        console.error('Error al obtener los batches:', error);
        this.errorMessage = 'No se pudo cargar la información. Intente nuevamente.';
        this.loading = false;
      }
    );
  }

  obtenerFechasUnicas(batches: Batch[]): string[] {
    const fechas = batches.map((batch) => batch.fecha_horneo);
    return Array.from(new Set(fechas.map((fecha) => new Date(fecha).toISOString().split('T')[0])));
  }

  getBatchesPorFecha(fecha: string): Batch[] {
    // Filtra primero por la fecha
    let batchesFiltradosPorFecha = this.batches.filter(
      (batch) => new Date(batch.fecha_horneo).toISOString().split('T')[0] === fecha
    );

    // Si hay un término de búsqueda (query), aplica el filtro adicional por número de batch
    if (this.query) {
      const query = this.query.toString().toLowerCase();
      batchesFiltradosPorFecha = batchesFiltradosPorFecha.filter((batch) =>
        batch.batch.toString().toLowerCase().includes(query)
      );
    }

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

    // Filtrar los batches por número en tiempo real
    this.batchesFiltrados = this.batches.filter((batch) =>
      batch.batch.toString().toLowerCase().includes(query)
    );

    // Obtener las fechas únicas de los batches filtrados
    this.fechasFiltradas = this.obtenerFechasUnicas(this.batchesFiltrados);
  }

  reiniciarFiltros() {
    this.query = ''; // Limpia el término de búsqueda
    this.batchesFiltrados = [...this.batches]; // Restaura todos los batches
    this.fechasFiltradas = [...this.fechasUnicas]; // Restaura todas las fechas
  }

  // Navegar a los detalles de un batch específico
  goToBatchDetails(batch: Batch) {
    this.router.navigate(['/detallebatch', batch.batch]);
  }




}
