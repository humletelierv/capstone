import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerBatch();
  }
  goBack() {
    this.router.navigate(['/estado']); // Navega a la página 'home' o cualquier página específica
  }
  goHome() {
    this.router.navigate(['/home']); // Navega a la página 'home' o cualquier página específica
  }
  goUser() {
    this.router.navigate(['/configuracion-usuario']); // Navega a la página 'home' o cualquier página específica
  }


  loadData(event: any) {
    setTimeout(() => {
      // Aquí puedes agregar lógica para cargar más datos
      console.log('Cargando más datos...');
      event.target.complete();

      // Si ya no hay más datos por cargar:
      // event.target.disabled = true;
    }, 1500); // Simulación de tiempo de carga
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


}
