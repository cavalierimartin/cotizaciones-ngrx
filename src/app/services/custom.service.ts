import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getProductFormTypos() {
    return this.http
      .get<any>(this.commonService.apiURL + '/form-typos/productos')
      .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
