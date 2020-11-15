import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { VacunaService } from 'src/app/services/vacuna.service';
import { EstudianteRegistroComponent } from '../estudiante-registro/estudiante-registro.component';
import { Vacuna } from '../models/vacuna';


@Component({
  selector: 'app-vacuna-registro',
  templateUrl: './vacuna-registro.component.html',
  styleUrls: ['./vacuna-registro.component.css']
})
export class VacunaRegistroComponent implements OnInit {

  formGroup: FormGroup;
  vacuna: Vacuna;

  constructor(private vacunaService: VacunaService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.buildForm();
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
