import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { AgregarMaterialComponent } from './agregar-material/agregar-material.component';
import { AsignarMaterialComponent } from './asignar-material/asignar-material.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard] },
    { path: 'materiales', component: MaterialesComponent, canActivate: [AuthGuard] },
    { path: 'agregar-empleado', component: AgregarEmpleadoComponent, canActivate: [AuthGuard] },
    { path: 'agregar-material', component: AgregarMaterialComponent, canActivate: [AuthGuard] },
    { path: 'asignar-material', component: AsignarMaterialComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
