import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthComponent } from './features/auth/auth.component';
import { ProductesComponent } from './features/productes/productes.component';
import { PerfilComponent } from './features/perfil/perfil.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'productes', component: ProductesComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    // { path: '', component: AuthComponent },
    // { path: '', component: AuthComponent },
    // { path: '', component: AuthComponent },
    // { path: '', component: AuthComponent },
];
