import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaterialService } from '../services/material.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
  materiales$: Observable<any[]> = of([]); // Inicializar con un observable vacío
  error: string | null = null;
  displayedColumns: string[] = ['tipo', 'nombre_material', 'caracteristicas', 'stock', 'estado', 'acciones'];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materiales$ = this.materialService.getMaterialesAgrupados().pipe(
      catchError(err => {
        console.error('Error al obtener materiales:', err);
        this.error = 'Error al obtener materiales';
        return of([]); // Retorna un observable vacío en caso de error
      })
    );
  }

  eliminarMaterial(id: number): void {
    this.materialService.deleteMaterial(id).subscribe(() => {
      this.materiales$ = this.materialService.getMaterialesAgrupados().pipe(
        catchError(err => {
          console.error('Error al obtener materiales:', err);
          this.error = 'Error al obtener materiales';
          return of([]); // Retorna un observable vacío en caso de error
        })
      );
    });
  }
  descargarTabla(): void {
    this.materiales$.subscribe(materiales => {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(materiales);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Materiales');
      XLSX.writeFile(wb, 'Materiales.xlsx');
    });
  }
}