import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { VacunaService } from 'src/app/services/vacuna.service';
import { EstudianteRegistroComponent } from '../estudiante-registro/estudiante-registro.component';
import { Estudiante } from '../models/Estudiante';
import { Vacuna } from '../models/vacuna';


@Component({
  selector: 'app-vacuna-registro',
  templateUrl: './vacuna-registro.component.html',
  styleUrls: ['./vacuna-registro.component.css']
})
export class VacunaRegistroComponent implements OnInit {

  formGroup: FormGroup;
  vacuna: Vacuna;
  estudiantes: Estudiante[];
  estudiante: Estudiante;
  identificacion: string;

  constructor(private vacunaService: VacunaService, private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    
    this.estudianteService.get().subscribe(result => {
      this.estudiantes = result;
    });
    
  }

  add(){
    this.vacunaService.post(this.vacuna).subscribe(p => {
      if (p != null) {
        this.vacuna = p;
        const modal = this.modalService.open(AlertModalComponent, {centered: true, scrollable: false});
        modal.componentInstance.tittle = "Resultado del registro:";
        modal.componentInstance.message = "¡La vacuna ha sido registrada exitosamente!";
        return;
      }
      
      this.modalService.open(EstudianteRegistroComponent, {centered: true, scrollable: false});
    });
  }

  private buildForm(){
    this.vacuna = new Vacuna();
    this.vacuna.nombre = '';
    this.vacuna.fechaDeAplicacion = null;
    this.vacuna.fkId = '';

    this.formGroup = this.formBuilder.group({
      nombre: [this.vacuna.nombre, Validators.required],
      fechaDeAplicacion: [this.vacuna.fechaDeAplicacion, Validators.required],
      fkId: [this.vacuna.fkId, Validators.required]
    });
  }

  buscarEstudiante(){
    if(!this.estudiantes){return;}

    if(this.estudiante){
      this.estudiante = null;
    }

    this.estudiantes.forEach(estudiante => {
      if (estudiante.identificacion == this.identificacion) {
        this.estudiante = estudiante;
        return;
      }
    });

    if(this.estudiante == null){
      this.modalService.open(EstudianteRegistroComponent, {centered: true, scrollable: false});
    }
  }

  get control(){
    return this.formGroup.controls;
  }

  onSubmit(){
    if(this.formGroup.invalid){
      return;
    }
    this.add();
  }

}
