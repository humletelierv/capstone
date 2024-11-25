import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoAnalisis } from '../../interface/info-analisis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-analisis',
  templateUrl: './detalle-analisis.page.html',
  styleUrls: ['./detalle-analisis.page.scss'],
})
export class DetalleAnalisisPage implements OnInit {
  batch: InfoAnalisis | undefined; // Batch actual mostrado en la vista
  loading: boolean = true; // Indicador de carga
  private subscriptions: Subscription = new Subscription(); // Para manejar la suscripción del observable

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerBatch();
  }
  ngOnDestroy(): void {
    // Cancelar todas las suscripciones al destruir el componente
    this.subscriptions.unsubscribe();
  }

  // Navegación
  goBack(): void {
    this.router.navigate(['/info-analisis']);
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
    const batchSubscription = this.authService.infoAnalisis().subscribe(
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
  private filtrarBatch(batches: InfoAnalisis[], numeroBatch: string): InfoAnalisis | undefined {
    return batches.find((b) => b.batch.toString() === numeroBatch);
  }

  getEstadoDescripcion(id_estado: number): string {
    const estados: { [key: number]: string } = {
      1: 'Definitivo',
      2: 'Parcial',
      3: 'Otro'
    };
    return estados[id_estado] || 'Desconocido';
  }

  getClienteDescripcion(id_cliente: number): string {
    const clientes: { [key: number]: string } = {
      1: 'AJEPER S.A.',
      2: 'CCU Heinecken',
      3: 'CERVECERA C.C.U. CHILE LTDA.',
      4: 'CERVECERIA BBC S.A.S.',
      5: 'CIA. CERVECERA ASUNCION',
      6: 'MALTEXCO S.A.',
      7: 'Otro'
    };
    return clientes[id_cliente] || 'Desconocido';
  }

  getTipoHornoDescripcion(id_tipo_horno: number): string {
    const estadosTipoHorno: { [key: number]: string } = {
      1: 'SEGINS',
      2: 'MIAG',
      0: 'NULL'
    };
    return estadosTipoHorno[id_tipo_horno] || 'Desconocido';
  }

  getTipoMaltaDescripcion(id_tipo_malta: number): string {
    const estadosTipoMalta: { [key: number]: string } = {
      1: 'Heinecken',
      2: 'Malta Melanoidina',
      3: 'Malta Munich',
      4: 'Malta Pale Ale',
      5: 'Malta Trigo',
      6: 'Malta Vienna',
      7: 'Pilsen',
      8: 'Malta Granel Talagante',
      9: 'Malta Heineken',
      16375: 'BARKE',
      15933: 'ESTEREL',
      19256: 'SHAKIRA',
      16378: 'RAYEN',
      16372: 'SCARLET',
      16381: 'SEBASTIAN',
      15955: 'TIPPLE',
      19384: 'QUENCH',
      19244: 'SUNSHINE',
      16374: 'OUT',
      18907: 'TRAVELER',
      20049: 'EXPLORER',
      19796: 'ETINCEL',
      20076: 'NATASSIA',
      20392: 'PLANET',
      20664: 'IRINA',
      19907: 'ANDREIA',
      19942: 'TRIGO MALTEADO GRANEL',
      8888: 'TRIGO MP',
      19943: 'MALTA MUNICH',
      20390: 'MALTA PALE ALE',
      19971: 'MALTA VIENNA',
      18075: 'MALTA 13',
      25: 'MALTA GRANEL TALAGANTE',
      15245: 'HEINEKEN',
      26: 'MALTA TEMUCO',
      21540: 'FANDAGA',
      21541: 'FOCUS',
      22022: 'ALHUE',
      21572: 'COSMOPOLITAN',
      2222: 'AMIDALA',
      333: 'YODA',
      0: 'NULL'
    };

    return estadosTipoMalta[id_tipo_malta] || 'Desconocido';
  }

  getVariedadDescripcion(id_variedad: number): string {
    const variedades: { [key: number]: string } = {
      1: 'BARKE',
      2: 'ESTEREL',
      3: 'SHAKIRA',
      4: 'RAYEN',
      5: 'SCARLET',
      6: 'SCARLET IMP',
      7: 'SEBASTIAN',
      8: 'TIPPLE',
      9: 'QUENCH',
      10: 'SUNSHINE',
      11: 'OUT',
      12: 'TRAVELER',
      13: 'EXPLORER',
      14: 'ETINCEL',
      15: 'NATASSIA',
      16: 'PLANET',
      17: 'IRINA',
      18: 'ANDREIA',
      19: 'CEBADA OUT',
      20: 'TRIGO',
      21: 'TRIGO MP',
      22: 'MALTA MUNICH',
      23: 'MALTA PALE ALE',
      24: 'MALTA VIENNA',
      25: 'MALTA 13',
      26: 'MALTA',
      27: 'HEINEKEN',
      28: 'MALTA TEMUCO',
      29: 'FANDAGA',
      30: 'FOCUS',
      31: 'ALHUE',
      32: 'COSMOPOLITAN',
      33: 'AMIDALA',
      34: 'YODA',
      35: 'SUBPRODUCTO'
    };
    return variedades[id_variedad] || 'Desconocido';
  }

  getAnalistaDescripcion(id_analista: number): string {
    const analistas: { [key: number]: string } = {
      1: 'Natalia Herrera',
      2: 'Jocelyn Carrillo',
      3: 'Catalina RDG',
      4: 'Carlos Peralta',
      5: 'Bruno Gonzalez',
      6: 'Monica Diaz',
      7: 'Camila Rodriguez',
      8: 'Otro' // Ajusta este valor si es necesario
    };
    return analistas[id_analista] || 'Desconocido';
  }


}
