import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from '../models/Estudiante';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estudiante-registro',
  templateUrl: './estudiante-registro.component.html',
  styleUrls: ['./estudiante-registro.component.css']
})
export class EstudianteRegistroComponent implements OnInit {

  formGroup: FormGroup;
  estudiante: Estudiante;

  constructor(private estudianteService: EstudianteService, private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  add(){
    this.estudianteService.post(this.estudiante).subscribe(p => {
      if (p != null) {
        this.estudiante = p;
        this.activeModal.close('Close click');
        this.activeModal.dismiss('Cross click')
        return;
      }
    });
    
  }

  private buildForm(){
    this.estudiante = new Estudiante();
    this.estudiante.nombre = '';
    this.estudiante.tipoDeDocumento = '';
    this.estudiante.fechaDeNacimiento = null;
    this.estudiante.identificacion = '';
    this.estudiante.institucionEducativa = '';
    this.estudiante.nombreDelAcudiente = '';
    this.estudiante.vacunas = null;

    this.formGroup = this.formBuilder.group({
      nombre: [this.estudiante.nombre, Validators.required],
      tipoDeDocumento: [this.estudiante.tipoDeDocumento, Validators.required],
      fechaDeNacimiento: [this.estudiante.fechaDeNacimiento, Validators.required],
      identificacion: [this.estudiante.identificacion, Validators.required],
      institucionEducativa: [this.estudiante.institucionEducativa, Validators.required],
      nombreDelAcudiente: [this.estudiante.nombreDelAcudiente, Validators.required]
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
