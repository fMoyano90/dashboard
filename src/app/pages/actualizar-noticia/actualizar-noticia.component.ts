import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-actualizar-noticia',
  templateUrl: './actualizar-noticia.component.html',
  styles: []
})
export class ActualizarNoticiaComponent implements OnInit {
  noticia: Noticia =  new Noticia('', '', '', '');

  public froala_options: Object = {
    placeholderText: 'Escribe el cuerpo de la noticia',
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'outdent', 'indent', 'insertHR', 'undo', 'redo', 'clearFormatting'],
    toolbarButtonsXS: ['bold', 'italic', 'underline'],
    toolbarButtonsSM: ['bold', 'italic', 'underline'],
    toolbarButtonsMD: ['bold', 'italic', 'underline'],
  };


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _noticiaService: NoticiaService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      this.cargarNoticia(id);
    });

   }

  ngOnInit() {

  }

  actualizarNoticia(noticia: Noticia){
      this._noticiaService.actualizarNoticia(noticia)
                          .subscribe(resp => {
                            this.router.navigate(['/dashboard']);
                          });
    }
  
  cargarNoticia( id:string ) {
    this._noticiaService.obtenerNoticia( id )
            .subscribe( noticia => {
              console.log(noticia);
              this.noticia = noticia;
            });
  }

  }


