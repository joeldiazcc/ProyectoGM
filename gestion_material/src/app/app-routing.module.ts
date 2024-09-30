import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MaterialesComponent } from './materiales/materiales.component';

const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent},
  { path: 'materiales', component: MaterialesComponent},
  { path: '', redirectTo: '/empleados', pathMatch: 'full' }, // Ruta default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
