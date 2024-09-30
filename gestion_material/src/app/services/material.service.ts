import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root',
})
export class MaterialService {
    private apiUrl = 'http://localhot:3000/api'; // URL del backemd
    constructor(private http: HttpClient) {}
    
    // Metodo para obteer todos los empleados
    getEmpleados() : Observable<any> {
        return this.http.get('${this.apiUrl}/empleados');
    }
    // Metodo para obteer todos los empleados
    getMateriales() : Observable<any> {
        return this.http.get('${this.apiUrl}/materiales');
    }
}