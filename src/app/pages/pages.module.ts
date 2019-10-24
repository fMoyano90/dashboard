// Modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Ng2 Charts
import { ChartsModule } from 'ng2-charts';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { GraficoBarraComponent } from '../components/grafico-barra/grafico-barra.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { EmpresasComponent } from './empresas/empresas.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdministradorComponent } from './administradores/administrador.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CrearGraficasComponent } from './graficas1/crear-graficas.component';
import { CrearEmpresaComponent } from './empresas/crear-empresa.component';
import { CrearNoticiasComponent } from './crear-noticias/crear-noticias.component';
import { DetalleNoticiaComponent } from './detalle-noticia/detalle-noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ActualizarNoticiaComponent } from './actualizar-noticia/actualizar-noticia.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    GraficoBarraComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    EmpresasComponent,
    AdministradoresComponent,
    AdministradorComponent,
    BusquedaComponent,
    CrearGraficasComponent,
    CrearEmpresaComponent,
    CrearNoticiasComponent,
    DetalleNoticiaComponent,
    NoticiasComponent,
    ActualizarNoticiaComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    ReactiveFormsModule,
   [FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],

  ]
})

export class PagesModule {}
