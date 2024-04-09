import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StadisticComponent } from './pages/dashboard/stadistic/stadistic.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
	{ path: 'login', component: AuthComponent},
  { 
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Ruta por defecto para '/dashboard'
      { path: 'dashboard', component: StadisticComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
