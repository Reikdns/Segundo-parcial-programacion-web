import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Estudiante } from '../parcial/models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  baseUrl: string;

  constructor(

    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService

  ) 
  {
    this.baseUrl = baseUrl;
  }

  get(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl + 'api/Estudiante')
      .pipe(tap(_ => this.handleErrorService.log('Datos enviados')),
        catchError(this.handleErrorService.handleError<Estudiante[]>('Consulta estudiante', null))
      );
  }

  post(estudiante: Estudiante): Observable<Estudiante> {

    return this.http.post<Estudiante>(this.baseUrl + 'api/Estudiante', estudiante)
      .pipe(tap(_ => this.handleErrorService.log('Datos enviados')),
        catchError(this.handleErrorService.handleError<Estudiante>('Registrar estudiante', null))
      );
  }
}
