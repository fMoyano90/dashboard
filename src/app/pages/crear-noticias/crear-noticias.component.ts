import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { Noticia } from '../../models/noticia.model';


@Component({
  selector: 'app-crear-noticias',
  templateUrl: './crear-noticias.component.html',
  styles: []
})
export class CrearNoticiasComponent implements OnInit {
  forma: FormGroup;
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
  }

  ngOnInit() {
    this.forma = new FormGroup({
      titulo: new FormControl( null, Validators.required ),
      descripcion: new FormControl( null, Validators.required ),
      body: new FormControl( null, Validators.required ),
      tipo: new FormControl( null , Validators.required ),
    });


  }

  subirNoticia() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let noticia = new Noticia(
      this.forma.value.titulo,
      this.forma.value.descripcion,
      this.forma.value.body,
      this.forma.value.tipo,
    );
    
    this._noticiaService.crearNoticia( noticia ).subscribe( resp => this.router.navigate(['/dashboard']));
  }


}
