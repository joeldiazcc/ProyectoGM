import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Método para obtener el token JWT almacenado
  private getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
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

  // Método para asignar material
  asignarMaterial(asignacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignar-material`, asignacion, { headers: this.getHeaders() });
  }

  // Método para agregar un nuevo empleado
  addEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/empleados`, empleado, { headers: this.getHeaders() });
  }

  // Método para agregar un nuevo material
  addMaterial(material: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/materiales`, material, { headers: this.getHeaders() });
  }

  // Método para eliminar un empleado
  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${id}`, { headers: this.getHeaders() });
  }

  // Método para eliminar un material
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materiales/${id}`, { headers: this.getHeaders() });
  }

  // Método para dar de baja a un empleado
  darBajaEmpleado(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/empleados/${id}/baja`, {}, { headers: this.getHeaders() });
  }

  // Método para obtener materiales agrupados
  getMaterialesAgrupados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materiales-agrupados`, { headers: this.getHeaders() });
  }

  // Método para actualizar un empleado
  updateEmpleado(empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/empleados/${empleado.id_empleado}`, empleado, { headers: this.getHeaders() });
  }

  // Método para quitar la asignación de un material
  quitarAsignacion(materialId: number, empleadoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/materiales/${materialId}/quitar-asignacion`, { empleadoId }, { headers: this.getHeaders() });
  }
}