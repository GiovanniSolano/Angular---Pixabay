import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';
import { SweetAlert2Service } from '../../services/sweet-alert2.service';

import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {


  termino = '';
  suscription: Subscription;
  listImagenes: any[];
  loading = false;
  imagenPorPagina = 30;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  constructor(private _imagenService: ImagenService,
              private _sweetAlertService: SweetAlert2Service) {

                this.listImagenes = [];

    this.suscription = this._imagenService.getTerminoBusqueda()  
      .subscribe(data => {
        this.termino = data;
        this.loading = true;
        this.paginaActual = 1;
        this.obtenerImagenes();
      });
   }

  ngOnInit(): void {
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino, this.imagenPorPagina, this.paginaActual)
    .pipe(delay(2000))
      .subscribe(imagenes => {
        this.loading = false;
        if(imagenes.hits.length === 0) {
          this._sweetAlertService.mostrarMensaje('No hay resultados', 'error');
          return;
        }

        this.calcularTotalPaginas = Math.ceil(imagenes.totalHits / this.imagenPorPagina);

        this.listImagenes = imagenes.hits;
        

      }, error => {
        this._sweetAlertService.mostrarMensaje('Opss... ocurrió un error', 'error');
        this.loading = false;

      });
  }

 
  cambiarPagina(valor: number) {


    let numPagina = this.paginaActual += valor;   
    this.listImagenes = [];
    this.loading = true; 

    if(numPagina === 1) {
      this.paginaActual = 1;
      this.obtenerImagenes();
    } else if (numPagina === this.calcularTotalPaginas) {
      this.paginaActual = this.calcularTotalPaginas;
      this.obtenerImagenes();
    } else {
      this.obtenerImagenes();
    }
    

  }

}
