import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia.model';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import _swal from 'sweetalert';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: []
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  usuario: Usuario;
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
    public _noticiaService: NoticiaService,
    public _modalUploadService: ModalUploadService
  ) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {

    this.cargarNoticias();
    
    this._modalUploadService.notificacion
            .subscribe( resp => 
              this.cargarNoticias()
              );
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('noticias', id);
  }

  cargarNoticias() {
    this.cargando = true;
    this._noticiaService.cargarNoticias(this.desde)
                        .subscribe((resp: any) => {
                          this.totalRegistros = resp.total;
                          this.noticias = resp.noticias;
                          this.cargando = false;
                          console.log(resp);
                        });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarNoticias();

  }

  borrarNoticia( noticia: Noticia ) {

    _swal( {
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar la noticia ' + noticia.titulo,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true
    })
    .then( borrar => {
      if (borrar) {
        this._noticiaService.borrarNoticia(noticia._id)
                      .subscribe(borrado =>{
                        console.log(borrado);
                        this.cargarNoticias();
                      });
      }
    });
  }

}
