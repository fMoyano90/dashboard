import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import _swal from 'sweetalert';
import { Administrador } from 'src/app/models/administrador.model';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  totalAdministradores: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarAdministradores() {

    let url = URL_SERVICIOS + '/administrador';

    return this.http.get( url )
              .pipe(map((resp: any) => {
                this.totalAdministradores = resp.total;
                return resp.administradores;
              }));

  }

  cargarAdministrador( id: string ){
    let url = URL_SERVICIOS + '/administrador/' + id;

    return this.http.get( url )
                  .pipe(map((resp:any) => resp.administrador));

  }

  buscarAdministradores( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/administrador/' + termino;
    return this.http.get(url)
                  .pipe(map((resp: any) => resp.administradores));
  }

  borrarAdministrador( id: string ) {
    let url = URL_SERVICIOS + '/administrador/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                .pipe(map((resp: any) => {
                  _swal('Administrador Borrado', 'Administrador borrado correctamente', 'success');
                  return true;
                }));
  }

  guardarAdministrador( administrador: Administrador ) {
    let url = URL_SERVICIOS + '/administrador';

    if ( administrador._id ) {
      // Actualizando
      url += '/' + administrador._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, administrador )
                .pipe(map( (resp: any) => {
                  _swal('Administrador Actualizado', administrador.nombre, 'success');
                  return resp.administrador;
                }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, administrador )
                .pipe(map( (resp: any) => {
                  _swal('Administrador Creado', administrador.nombre, 'success');
                  return resp.administrador;
                }));
    }
  }
}
