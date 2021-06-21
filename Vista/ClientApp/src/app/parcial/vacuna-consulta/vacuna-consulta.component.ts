import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { VacunaService } from '../../services/vacuna.service';
import { Vacuna } from '../models/vacuna';

@Component({
  selector: 'app-vacuna-consulta',
  templateUrl: './vacuna-consulta.component.html',
  styleUrls: ['./vacuna-consulta.component.css']
})
export class VacunaConsultaComponent implements OnInit {

  searchText: string;
  vacunas: Vacuna[];
  numeroDeVacunados :number = 0;

  constructor(private vacunaService: VacunaService, private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.get();
    this.contarVacunados();
  }

  get(){
    this.vacunaService.get().subscribe( vacuna => {
      this.vacunas = vacuna;
    });
  }

  contarVacunados(){
    this.estudianteService.get().subscribe(estudiantes => {
      estudiantes.forEach(estudiante => {
        if(estudiante.vacunas.length != 0){
          this.numeroDeVacunados++;
        }
      });
    });
  }
}
