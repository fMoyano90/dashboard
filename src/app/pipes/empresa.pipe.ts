import { Pipe, PipeTransform } from '@angular/core';
import { EmpresaService } from 'src/app/services/service.index';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '@amcharts/amcharts4/core';

@Pipe({
  name: 'empresa'
})
export class EmpresaPipe implements PipeTransform {
  public nombre;

  constructor(
    public _empresaService: EmpresaService,
  ) {  }

  transform(id: string): any {


   let cadena = id;
   let cadena_array = cadena.split(',');

   console.log(cadena_array);

   return cadena_array[1];



  }

  recibirNombre( id: string ): Observable<string> {
    return this._empresaService.obtenerEmpresa( id ).pipe(map(res => {
      this.nombre = res.nombre;
      return this.nombre;
    }));
  }
}
