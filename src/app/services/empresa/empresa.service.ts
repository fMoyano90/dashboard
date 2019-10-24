import { Injectable } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import _swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresa: Empresa;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) {
   }

  cargarEmpresas( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/empresa?desde=' + desde;

    return this.http.get( url )
                   .pipe(map( (resp:any) => resp ));
  }

  obtenerEmpresa( id: string ) {
    let url = URL_SERVICIOS + '/empresa/' + id;
    return this.http.get( url )
                    .pipe(map((resp: any) => resp.empresa ));
  }

  crearEmpresa( empresa: Empresa ) {
    let url = URL_SERVICIOS + '/empresa';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, empresa )
                      .pipe(map( (resp: any) => {
                        _swal('Empresa creada', empresa.nombre, 'success');
                        return resp.empresa.nombre;
                      }));
  }

  actualizarEmpresa(	empresa:	Empresa ) {
    let url = URL_SERVICIOS + '/empresa/' + empresa._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, empresa)
                    .pipe(map((resp: any) =>{
                      _swal('Usuario actualizado', empresa.nombre, 'success');

                      return true;
                    }));
  }

  cambiarimagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo(archivo, 'empresas', id)
        .then((resp: any) => {
          this.empresa.img = resp.empresa.img;
          _swal('Imagen Actualizada', this.empresa.nombre, 'success');
        })
        .catch(resp => {
          console.log(resp);
        });
  }

  borrarEmpresa( id: string	) {
    let url =  URL_SERVICIOS + '/empresa/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                  .pipe(map((resp: any) => {
                    _swal('Empresa borrada', 'La empresa a sido eliminada correctamente', 'success');
                    return true;
                  }));
  }

  buscarEmpresa(	termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/empresa/' + termino;
    return this.http.get(url)
                  .pipe(map((resp: any) => resp.empresas));
  }

}
