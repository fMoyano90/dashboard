import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';
import _swal from 'sweetalert';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styles: []
})
export class CrearEmpresaComponent implements OnInit {
  forma: FormGroup;
  empresa: Empresa =  new Empresa('', '');
  
  
  constructor(
    public _router: Router,
    public _empresaService: EmpresaService
  ) { 

  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      categoria: new FormControl( null, Validators.required ),
   } );
  }

  crearEmpresa() {
    
    if ( this.forma.invalid ) {
      console.log('forma invalida', this.forma);
      return;
    }

    let empresa = new Empresa(
      this.forma.value.nombre,
      this.forma.value.categoria,
    );

    console.log(empresa)

    this._empresaService.crearEmpresa(empresa)
                  .subscribe( crear => {
                    console.log(crear);
                    this._router.navigate(['/empresas'])
                  });
  }

}
