import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import { GraficoService } from '../../services/grafico/grafico.service';
import { Grafico } from 'src/app/models/grafico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import _swal from 'sweetalert';


@Component({
  selector: 'app-crear-graficas',
  templateUrl: './crear-graficas.component.html',
  styles: []
})
export class CrearGraficasComponent implements OnInit {
  empresa: Empresa;
  forma: FormGroup;

  grafico: Grafico =  new Grafico(1, '', '');
  
  resultado: number;
  resultado1: number;
  resultado2: number;
  resultado3: number;
  resultado4: number;
  resultado5: number;
  resultado6: number;
  resultado7: number;
  resultado8: number;
  resultado9: number;

  constructor(
    public _empresaService: EmpresaService,
    public _graficoService: GraficoService,
    public _router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      console.log(params);
      let id = params['empresa'];
      this.cargarEmpresa(id);
    });
  }

  ngOnInit() {
    this.forma = new FormGroup({
      data: new FormControl( 1 ),
      tipo: new FormControl( '' ),
   } );
  }


  cargarEmpresa( id:string ) {

    this._empresaService.obtenerEmpresa( id )
            .subscribe( empresa => {
              console.log(empresa);
              this.empresa = empresa;
              // this.usuario.empresa_id = usuario.empresa._id;
              // this.cambioEmpresa(this.usuario.empresa_id);
            });
  }

  crearGrafico() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'ATP',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                  });
  }

  crearGraficoUno() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'PBO',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoDos() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'PTE',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoTres() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'CSR',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoCuatro() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'DEQ',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoCinco() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'DUP',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoSeis() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'CST',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoSiete() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'DST',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoOcho() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'CMP',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoNueve() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'TCR',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoDiez() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'OTIF',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoOnce() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'SOS',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoDoce() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'DVA',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }
  crearGraficoTrece() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let grafico = new Grafico(
      this.forma.value.data,
      this.forma.value.tipo = 'SCL',
      this.empresa._id
    );


    console.log(grafico)

    this._graficoService.crearGrafico(grafico)
                  .subscribe( crear => {
                    console.log(crear);
                    
                  });
  }



  operacionUno(val1: number, val2:number){
    this.resultado = +val1 / +val2;
    console.log(this.resultado);
    return this.resultado;
  }
  operacionDos(val1: number, val2:number, val3: number){
    this.resultado1 = +val1 / (+val2 * +val3);
    console.log(this.resultado1);
    return this.resultado1;
  }

  operacionTres(val1: number, val2:number){
    this.resultado2 = (+val1 / +val2) * 100;
    console.log(this.resultado2);
    return this.resultado2;
  }
  operacionCuatro(val1: number, val2:number){
    this.resultado3 = +val1 / +val2;
    console.log(this.resultado3);
    return this.resultado3;
  }
  operacionCinco(val1: number, val2:number, val3:number){
    this.resultado4 = +val1 / +val2;
    console.log(this.resultado4);
    return this.resultado4;
  }
  operacionSeis(val1: number, val2:number){
    this.resultado5 = +val1 / +val2;
    console.log(this.resultado5);
    return this.resultado5;
  }
  operacionSiete(val1: number, val2:number){
    this.resultado6 = (+val1 / +val2) * 100;
    console.log(this.resultado6);
    return this.resultado6;
  }
  operacionOcho(val1: number, val2:number){
    this.resultado7 = (+val1 / +val2) * 100;
    console.log(this.resultado7);
    return this.resultado7;
  }
  operacionNueve(val1: number, val2:number){
    this.resultado8 = (+val1 / +val2) * 100;
    console.log(this.resultado8);
    return this.resultado8;
  }
  operacionDiez(val1: number, val2:number){
    this.resultado9 = (+val1 / +val2) * 100;
    console.log(this.resultado9);
    return this.resultado9;
  }

  }



