import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Vacuna } from '../parcial/models/vacuna';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  baseUrl: string;

  constructor(

    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService

  ) 
  {
    this.baseUrl = baseUrl;
  }

  get(): Observable<Vacuna[]> {
    return this.http.get<Vacuna[]>(this.baseUrl + 'api/Vacuna')
      .pipe(tap(_ => this.handleErrorService.log('Datos enviados')),
        catchError(this.handleErrorService.handleError<Vacuna[]>('Consulta vacuna', null))
      );
  }

  post(vacuna: Vacuna): Observable<Vacuna> {

    return this.http.post<Vacuna>(this.baseUrl + 'api/Vacuna', vacuna)
      .pipe(tap(_ => this.handleErrorService.log('Datos enviados')),
        catchError(this.handleErrorService.handleError<Vacuna>('Registrar vacuna', null))
      );
  }
}
