import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.page.html',
  styleUrls: ['./procesos.page.scss'],
})
export class ProcesosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Función para navegar a la página Estado
  goToInfoTina() {
    this.router.navigateByUrl('/info-tina');
  }

}
