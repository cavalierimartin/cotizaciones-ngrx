import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Categoria } from '../models/categoria';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  createCategory(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(
        this.commonService.apiURL + '/categorias',
        JSON.stringify(categoria),
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getCategoryById(id: string): Observable<Categoria> {
    return this.http
      .get<Categoria>(this.commonService.apiURL + '/categorias/' + id)
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllCategories(): Observable<[Categoria]> {
    return this.http
      .get<[Categoria]>(this.commonService.apiURL + '/categorias')
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  updateCategory(categoria: Categoria) {
    return this.http
      .put<Categoria>(
        this.commonService.apiURL + '/categorias/' + categoria.id,
        JSON.stringify(categoria),
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  deleteCategoryById(id: string) {
    return this.http
      .delete<Categoria>(
        this.commonService.apiURL + '/categorias/' + id,
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

}


// // Obtener todos los tiempos

// tiempo1 = fasdfasdf;
// tiempo2 = fasdfasdf;
// tiempo3 = fasdfasdf;
// tiempo4 = fasdfasdf;

// // Sumarlos
// tiempoTotal = tiempo1+tiempo2+tiempo3+tiempo4

// // Mostrarlo en pantalla (formateado)
// this.mostrarEnPantalla(tiempoTotal)



