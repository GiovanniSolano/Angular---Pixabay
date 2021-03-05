import { Component, OnInit } from '@angular/core';
import { SweetAlert2Service } from '../../services/sweet-alert2.service';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {

  nombreImagen: string;

  constructor(private _sweetAlertService: SweetAlert2Service,
    private _imagenService: ImagenService) { 
    this.nombreImagen = 'Bosque';
  }

  ngOnInit(): void {
  }


  buscarImagenes() {
    
    if(this.nombreImagen === '') {
      this._sweetAlertService.mostrarMensaje('Agrega un texto de búsqueda', 'error');
      return;
    }

    this._imagenService.enviarTerminoBusqueda(this.nombreImagen);
    
  }

}
