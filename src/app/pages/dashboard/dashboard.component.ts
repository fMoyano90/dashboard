import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia.model';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Validators } from '@angular/forms';
import _swal from 'sweetalert';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  noticias_principales: Noticia;
  noticias_normales: Noticia[] = [];
  noticia: Noticia;
  usuario: Usuario;
  desde: number = 0;
  cargando: boolean = true;
  totalRegistros: number = 0;
  id_empresa: string;



  constructor(
    public _noticiaService: NoticiaService,
    public _modalUploadService: ModalUploadService

    ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }

  ngOnInit() {
    $('.carousel').carousel();
    $('#compromisos').css('font-size', '15px');
    this.cargarNoticiasPrincipales();
    this.cargarNoticiasNormales();

    this._modalUploadService.notificacion
            .subscribe( resp => 
              this.cargarNoticiasNormales(),
              this.cargarNoticiasPrincipales()
              );

    let cadena_empresa = JSON.stringify(this.usuario.empresa_id);
    let cadena_array =  cadena_empresa.split(',');
    let cadena_limpia = cadena_array[0].replace('"', '');
    let cadena_sin_espacios = cadena_limpia.trim();
    this.id_empresa = cadena_sin_espacios;

  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('noticias', id);
  }

  cargarNoticiasNormales() {
    this.cargando = true;
    this._noticiaService.cargarNormales(this.desde)
                        .subscribe((resp: any) => {
                          this.totalRegistros = resp.total;
                          this.noticias_normales = resp.normales;
                          this.cargando = false;
                          console.log(this.noticias_normales);
                        });
  }
  cargarNoticiasPrincipales() {
    this.cargando = true;
    this._noticiaService.cargarPrincipales(this.desde)
                        .subscribe((resp: any) => {
                          this.totalRegistros = resp.total;
                          this.noticias_principales = resp.principales;
                          this.cargando = false;
                          console.log(this.noticias_principales);
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
    this.cargarNoticiasNormales();

  }

  borrarEmpresa( noticia: Noticia ) {

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
                        this.cargarNoticiasNormales();
                        this.cargarNoticiasPrincipales();
                      });
      }
    });
  }



}
