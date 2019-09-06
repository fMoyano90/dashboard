import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdministradorComponent } from './administradores/administrador.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progreso'}  },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'}  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuración'}  },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Mantenimiento de Empresas' } },
            { path: 'administradores', component: AdministradoresComponent, data: { titulo: 'Mantenimiento de Administradores' } },
            { path: 'administrador/:id', component: AdministradorComponent, data: { titulo: 'Actualizar Administrador' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );