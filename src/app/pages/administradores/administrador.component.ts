import { Component, OnInit, ɵConsole } from '@angular/core';
import { AdministradorService } from '../../services/administrador/administrador.service';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Administrador } from '../../models/administrador.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: []
})
export class AdministradorComponent implements OnInit {

  empresas: Empresa[] = [];
  administrador: Administrador = new Administrador('', '', '', '', '');
  empresa: Empresa =  new Empresa('');

  constructor(
    public _administadorService: AdministradorService,
    public _empresaService: EmpresaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadServie: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];

      if(id !== 'nuevo'){
        this.cargarAdministrador(id);
      }
    });
   }

  ngOnInit() {
    this._empresaService.cargarEmpresas()
            .subscribe( resp => this.empresas = resp.empresas );
    this._modalUploadServie.notificacion
    .subscribe(resp => {
      this.administrador.img = resp.administrador.img;
    });
  }

  cargarAdministrador( id:string ) {

    this._administadorService.cargarAdministrador( id )
            .subscribe( administrador => {
              console.log(administrador);
              this.administrador = administrador;
              this.administrador.empresa = administrador.empresa._id;
              this.cambioEmpresa(this.administrador.empresa);
            });
  }

  guardarAdministrador(f: NgForm) {
    if( f.invalid ){
      return;
    }
    this._administadorService.guardarAdministrador( this.administrador )
                  .subscribe( administrador => {
                    this.administrador._id = administrador._id;
                    this.router.navigate(['administrador', administrador._id]);
                  });
  }

  cambioEmpresa(id: string) {
    this._empresaService.obtenerEmpresa( id )
            .subscribe( empresa => this.empresa = empresa );
  }

  cambiarFoto(){
    this._modalUploadServie.mostrarModal('administradores', this.administrador._id);
  }

}
