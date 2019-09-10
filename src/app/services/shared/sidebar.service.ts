import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //    titulo: 'Principal',
  //    icono: 'mdi mdi-gauge',
  //    submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Informes', url: '/progress' },
  //       { titulo: 'Estadisticas', url: '/graficas1' },
  //       { titulo: 'Historial', url: '/promesas' },
  //       { titulo: 'RXJS', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Matenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Empresas', url: '/empresas' },
  //       { titulo: 'Administradores', url: '/administradores' }
  //     ]
  //   }

  // ];

  constructor(
    public _usuarioService: UsuarioService
  ) {}

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}
