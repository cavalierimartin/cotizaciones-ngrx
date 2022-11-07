import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Material } from '../models/material';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  createMaterial(material: Material): Observable<Material> {
    return this.http
      .post<Material>(
        this.commonService.apiURL + '/materiales',
        JSON.stringify(material),
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http
      .get<Material>(this.commonService.apiURL + '/materiales/' + id)
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllMaterials(): Observable<[Material]> {
    return this.http
      .get<[Material]>(this.commonService.apiURL + '/materiales')
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  updateMaterial(material: Material) {
    return this.http
      .put<Material>(
        this.commonService.apiURL + '/materiales/' + material.material,
        JSON.stringify(material),
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  deleteMaterialById(id: string) {
    return this.http
      .delete<Material>(
        this.commonService.apiURL + '/materiales/' + id,
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

}
