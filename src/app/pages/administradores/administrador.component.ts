import { Component, OnInit, ɵConsole } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: []
})
export class AdministradorComponent implements OnInit {

  forma: FormGroup;

  empresas: Empresa[] = [];
  empresa: Empresa =  new Empresa('', '');
  usuario: Usuario = new Usuario('', '', '', 'ADMINISTRADOR', [], '', true);

  constructor(
    public _usuarioService: UsuarioService,
    public _empresaService: EmpresaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadServie: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];

      if(id !== 'nuevo'){
        this.cargarUsuario(id);
      }
    });
   }

   sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this._empresaService.cargarEmpresas()
            .subscribe( resp => this.empresas = resp.empresas );
    this._modalUploadServie.notificacion
    .subscribe(resp => {
      this.usuario.img = resp.usuario.img;
    });

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      empresa_id: new FormControl( [] , Validators.required ),
   
      role: new FormControl( 'ADMINISTRADOR', Validators.required ),
    }, { validators: this.sonIguales( 'password', 'password2') } );

  }

  cargarUsuario( id:string ) {

    this._usuarioService.cargarUsuario( id )
            .subscribe( usuario => {
              console.log(usuario);
              this.usuario = usuario;
              // this.usuario.empresa_id = usuario.empresa._id;
              // this.cambioEmpresa(this.usuario.empresa_id);
            });
  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.role,
      this.forma.value.empresa_id,
    );

    console.log(usuario);

    this._usuarioService.crearUsuario( usuario ).subscribe( resp => this.router.navigate(['/administradores']));
  }

  cambioEmpresa(id: string) {
    this._empresaService.obtenerEmpresa( id )
            .subscribe( empresa => this.empresa = empresa );
  }

  cambiarFoto(){
    this._modalUploadServie.mostrarModal('usuarios', this.usuario._id);
  }

}
