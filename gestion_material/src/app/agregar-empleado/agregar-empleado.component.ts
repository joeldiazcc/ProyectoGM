import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root',
})
export class MaterialService {
    private apiUrl = 'http://localhost:3000/api'; 

    constructor(private http: HttpClient) {}

    // Método para obtener el token JWT almacenado
    private getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }

    // Método para obtener los encabezados con el token JWT
    private getHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token ? token : ''
        });
    }

    // Método para obtener todos los empleados
    getEmpleados(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/empleados`, { headers: this.getHeaders() });
    }

    // Método para obtener todos los materiales
    getMateriales(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/materiales`, { headers: this.getHeaders() });
    }

    // Método para agregar un nuevo empleado
    addEmpleado(empleado: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/empleados`, empleado, { headers: this.getHeaders() });
    }

    // Método para agregar un nuevo material
    addMaterial(material: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/materiales`, material, { headers: this.getHeaders() });
    }

    // Método para obtener materiales agrupados
    getMaterialesAgrupados(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/materiales-agrupados`, { headers: this.getHeaders() });
    }

    darBajaEmpleado(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/empleados/${id}/baja`, {});
    }

    deleteMaterial(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/materiales/${id}`, { headers: this.getHeaders() });
    }

    quitarAsignacion(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/materiales/${id}/quitar-asignacion`, {}, { headers: this.getHeaders() });
    }

    eliminarUltimoAgregado(nombre_material: string, tipo: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/materiales/eliminar-ultimo`, {
            headers: this.getHeaders(),
            params: { nombre_material, tipo }
        });
    }
}


@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent {
  nuevoEmpleado = { nombre_empleado: '', apellido1_empleado: '', apellido2_empleado: '', estado: 'Alta', fecha_alta: '', correo: '' };
  mensaje: string | null = null;

  constructor(private materialService: MaterialService) {}

  agregarEmpleado(): void {
    const empleadoData = {
      ...this.nuevoEmpleado,
      fecha_baja: null // Establecer fecha_baja como NULL por defecto
    };

    this.materialService.addEmpleado(empleadoData).subscribe((empleado: any) => {
      console.log('Empleado agregado:', empleado);
      this.mensaje = 'Empleado agregado correctamente';
      this.nuevoEmpleado = { nombre_empleado: '', apellido1_empleado: '', apellido2_empleado: '', estado: 'Alta', fecha_alta: '', correo: '' }; // Limpiar el formulario
      setTimeout(() => this.mensaje = null, 3000); // Ocultar el mensaje después de 3 segundos
    });
  }
}
