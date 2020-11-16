import { Component, OnInit } from '@angular/core';
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

  constructor(private vacunaService: VacunaService) { }

  ngOnInit(): void {
    this.get();
    this.vacunas.forEach(vacuna => {
      vacuna.fechaDeAplicacion.setFullYear(vacuna.fechaDeAplicacion.getFullYear());
    });
  }

  get(){
    this.vacunaService.get().subscribe( vacuna => {
      this.vacunas = vacuna;
    });
  }

}
