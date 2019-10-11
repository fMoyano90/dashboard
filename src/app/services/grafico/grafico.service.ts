import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grafico } from '../../models/grafico.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import _swal from 'sweetalert';





@Injectable({
  providedIn: 'root'
})
export class GraficoService {
  public token: string;


  constructor(
    private http: HttpClient
) {
  this.token = localStorage.getItem('token');
}

crearGrafico( grafico: Grafico ) {
  let url = URL_SERVICIOS + '/grafico';
  url += '?token=' + this.token;

  return this.http.post( url, grafico )
                    .pipe(map( (resp: any) => {
                      _swal('Grafico actualizado', 'Se actualizo grafico tipo: ' + resp.grafico.tipo, 'success');
                      return resp.grafico.nombre;
                    }));
}

obtenerGrafico( id: string, tipo: string ) {
  let url = URL_SERVICIOS + '/grafico/' + id + '/' + tipo;
  return this.http.get( url )
                  .pipe(map((resp: any) => resp.grafico ));
}

borrarGrafico( id: string	) {
  let url =  URL_SERVICIOS + '/grafico/' + id;
  url += '?token=' + this.token;

  return this.http.delete( url )
                .pipe(map((resp: any) => {
                  _swal('Grafico borrado', 'El grafico a sido eliminado correctamente', 'success');
                  return true;
                }));
}
}
