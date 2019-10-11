import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Validators } from '@angular/forms';
import _swal from 'sweetalert';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  empresa: Empresa;
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _empresaService: EmpresaService,
    public _modalUploadService: ModalUploadService

  ) { }

  ngOnInit() {
    this.empresa = new Empresa('', '');

    this.cargarEmpresas();

    this._modalUploadService.notificacion
            .subscribe( resp => this.cargarEmpresas() );
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('empresas', id);
  }

  cargarEmpresas() {
    this.cargando = true;
    this._empresaService.cargarEmpresas(this.desde)
                        .subscribe((resp: any) => {
                          this.totalRegistros = resp.total;
                          this.empresas = resp.empresas;
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
    this.cargarEmpresas();

  }




  buscarEmpresa(termino: string) {

    if (termino.length <= 0) {
      this.cargarEmpresas();
      return;
    }

    this.cargando = true;

    this._empresaService.buscarEmpresa( termino )
                        .subscribe((empresas: Empresa[]) => {
                          this.empresas =  empresas;
                          this.cargando =  false;
                        });

  }

  borrarEmpresa( empresa: Empresa ) {

    _swal( {
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar la empresa ' + empresa.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true
    })
    .then( borrar => {
      if (borrar) {
        this._empresaService.borrarEmpresa(empresa._id)
                      .subscribe(borrado =>{
                        console.log(borrado);
                        this.cargarEmpresas();
                      });
      }
    });
  }

  guardarEmpresa(empresa: Empresa){
    this._empresaService.actualizarEmpresa(empresa)
                        .subscribe();
  }


}
