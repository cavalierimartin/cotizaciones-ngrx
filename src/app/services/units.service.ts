import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Medida } from '../models/medida';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  constructor(private http: HttpClient, private commonService: CommonService) { }

  createUnit(unidad: Medida['unidad']): Observable<Medida['unidad']> {
    return this.http
      .post<Medida['unidad']>(
        this.commonService.apiURL + '/unidades',
        JSON.stringify(unidad),
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  // getMeasureById(id: string): Observable<Medida['unidad']> {
  //   return this.http
  //     .get<Medida['unidad']>(this.commonService.apiURL + '/unidades/' + id)
  //     .pipe(retry(1), catchError(this.commonService.handleError));
  // }

  getAllUnits(): Observable<[Medida['unidad']]> {
    return this.http
      .get<[Medida['unidad']]>(this.commonService.apiURL + '/unidades')
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  // updateUnit(unidad: Medida['unidad']) {
  //   return this.http
  //     .put<Medida['unidad']>(
  //       this.commonService.apiURL + '/unidades/' + unidad,
  //       JSON.stringify(unidad),
  //       this.commonService.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.commonService.handleError));
  // }

  // deleteMeasureById(id: string) {
  //   return this.http
  //     .delete<Medida['unidad']>(
  //       this.commonService.apiURL + '/unidades/' + id,
  //       this.commonService.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.commonService.handleError));
  // }
}
