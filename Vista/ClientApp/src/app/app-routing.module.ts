import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VacunaRegistroComponent } from './parcial/vacuna-registro/vacuna-registro.component';
import { VacunaConsultaComponent } from './parcial/vacuna-consulta/vacuna-consulta.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'registroVacuna',
    component: VacunaRegistroComponent
  },
  {
    path: 'consultaVacuna',
    component: VacunaConsultaComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
