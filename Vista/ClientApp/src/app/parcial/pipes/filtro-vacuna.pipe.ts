import { Pipe, PipeTransform } from '@angular/core';
import { Vacuna } from '../models/vacuna';

@Pipe({
  name: 'filtroVacuna'
})
export class FiltroVacunaPipe implements PipeTransform {

  transform(vacunas: Vacuna[], searchText: string): any {
    if (searchText == null) return vacunas;
    return vacunas.filter(vacuna => vacuna.nombre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}
