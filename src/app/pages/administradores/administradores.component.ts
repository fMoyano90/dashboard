import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, EmpresaService } from 'src/app/services/service.index';
import { Validators } from '@angular/forms';
import _swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styles: []
})
export class AdministradoresComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  nombre: string;
  id: string;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _empresaService: EmpresaService,

  ) {
    this.cargarUsuarios();
   }

  ngOnInit() {
    this._modalUploadService.notificacion
            .subscribe( resp => this.cargarUsuarios() );

    // this.recibirNombre(this.id).subscribe((data: any) => this.nombre = data);
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarAdministradores(this.desde)
                        .subscribe((resp: any) => {
                          this.totalRegistros = resp.total;
                          this.usuarios = resp.administradores;
                          this.cargando = false;
                          console.log(this.usuarios);
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
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
                        .subscribe((usuarios: Usuario[]) => {
                          this.usuarios =  usuarios;
                          this.cargando =  false;
                        });

  }

  borrarUsuario( usuario: Usuario ) {
    if (usuario._id === this._usuarioService.usuario._id) {
      _swal('No se puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    _swal( {
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true
    })
    .then( borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
                      .subscribe(borrado =>{
                        console.log(borrado);
                        this.cargarUsuarios();
                      });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
                        .subscribe();
  }
  
//   recibirNombre( id: string ): Observable<string> {
//     return this._empresaService.obtenerEmpresa( id ).pipe(map(res => {
//       this.nombre = res.nombre;
//       return this.nombre;
//     }));
//  }
}