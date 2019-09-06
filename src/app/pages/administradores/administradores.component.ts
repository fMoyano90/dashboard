import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styles: []
})
export class AdministradoresComponent implements OnInit {


  administradores: Administrador[] = [];

  constructor(
    public _administadorService: AdministradorService
  ) { }

  ngOnInit() {
    this.cargarAdministradores();
  }

  cargarAdministradores() {
    this._administadorService.cargarAdministradores()
                          .subscribe( administradores => this.administradores = administradores);
  }

  buscarAdministrador(termino: string) {
    if(termino.length <=0){
      this.cargarAdministradores();
      return;
    }
    this._administadorService.buscarAdministradores( termino )
              .subscribe(administradores => this.administradores = administradores);
  }

  borrarAdministrador( administrador: Administrador ) {
    this._administadorService.borrarAdministrador( administrador._id )
                .subscribe(() => this.cargarAdministradores());
  }
}
