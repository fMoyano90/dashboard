import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia/noticia.service';
import { Noticia } from 'src/app/models/noticia.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styles: []
})
export class DetalleNoticiaComponent implements OnInit {

  noticia: Noticia;

  constructor(
    public _noticiaService: NoticiaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      this.cargarNoticia(id);
    });
  }

  ngOnInit() {
  }

  cargarNoticia( id:string ) {

    this._noticiaService.obtenerNoticia( id )
            .subscribe( noticia => {
              console.log(noticia);
              this.noticia = noticia;
            });
  }

}
