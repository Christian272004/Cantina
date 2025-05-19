import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthComponent } from './features/auth/auth.component';
import { ProductesComponent } from './features/productes/productes.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { HistorialComponent } from './features/historial/historial.component';
import { ReservesComponent } from './features/reserves/reserves.component';
import { GestionComponent } from './features/gestion/gestion.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'productes', component: ProductesComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard] },
    { path: 'reserves', component: ReservesComponent, canActivate: [AuthGuard] },
    { path: 'gestion', component: GestionComponent, canActivate: [AuthGuard] },
    // { path: '', component: AuthComponent },
];
