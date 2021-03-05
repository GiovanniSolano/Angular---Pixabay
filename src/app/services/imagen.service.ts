import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  enviarTerminoBusqueda(termino: string) {
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(termino: string, imagenesPorPagina: number, paginaActual: number): Observable<any> {
    const KEY = '20532779-eb4fcb872685deb9d21972f11';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${termino}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
    return this.http.get(URL);
  }

}
