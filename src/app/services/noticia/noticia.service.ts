import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Noticia } from '../../models/noticia.model';
import { UsuarioService } from '../usuario/usuario.service';
import _swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  
  noticia: Noticia;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {
   }

   obtenerNoticia( id: string ) {
    let url = URL_SERVICIOS + '/noticia/' + id;
    return this.http.get( url )
                    .pipe(map((resp: any) => resp.noticia ));
  }

  cargarNoticias( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/noticia?desde=' + desde;

    return this.http.get( url )
                   .pipe(map( (resp:any) => resp ));
  }
  
   cargarPrincipales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/noticia/principales?desde=' + desde;
    return this.http.get( url );

  }

  
  cargarNormales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/noticia/normales?desde=' + desde;
    return this.http.get( url );

  }

  crearNoticia( noticia: Noticia ) {
    let url = URL_SERVICIOS + '/noticia';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, noticia )
                      .pipe(map( (resp: any) => {
                        _swal('Noticia creada', noticia.titulo, 'success');
                        return resp.noticia;
                      }));
  }

  actualizarNoticia(	noticia:	Noticia ) {
    let url = URL_SERVICIOS + '/noticia/' + noticia._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, noticia)
                    .pipe(map((resp: any) =>{
                      _swal('Noticia actualizada', noticia.titulo, 'success');

                      return true;
                    }));
  }

  cambiarimagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo(archivo, 'noticias', id)
        .then((resp: any) => {
          this.noticia.img = resp.noticia.img;
          _swal('Imagen Actualizada', this.noticia.titulo, 'success');
        })
        .catch(resp => {
          console.log(resp);
        });
  }

  borrarNoticia( id: string	) {
    let url =  URL_SERVICIOS + '/noticia/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                  .pipe(map((resp: any) => {
                    _swal('Noticia borrada', 'La noticia a sido eliminada correctamente', 'success');
                    return true;
                  }));
  }
}
