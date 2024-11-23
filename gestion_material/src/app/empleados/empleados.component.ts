import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MaterialService } from '../services/material.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  materiales: any[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['id_empleado', 'nombre_completo', 'correo', 'estado', 'fecha_alta', 'fecha_baja', 'material_asignado', 'acciones'];
  empleadoSeleccionado: any = null;
  empleadoModificando: any = null;

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    forkJoin({
      empleados: this.materialService.getEmpleados(),
      materiales: this.materialService.getMateriales()
    }).subscribe(
      ({ empleados, materiales }) => {
        this.empleados = empleados;
        this.materiales = materiales;
      },
      err => {
        this.error = 'Error al cargar datos';
        console.error('Error al cargar datos:', err);
      }
    );
  }

  getMaterialesAsignados(empleadoId: number): any[] {
    return this.materiales.filter(material => material.empleado_asignado === empleadoId);
  }

  getMaterialesAsignadosString(empleadoId: number): string {
    return this.getMaterialesAsignados(empleadoId).map(m => m.tipo).join(', ');
  }

  getNombreCompleto(empleado: any): string {
    return `${empleado.nombre_empleado} ${empleado.apellido1_empleado} ${empleado.apellido2_empleado || ''}`.trim();
  }

  mostrarDetalles(empleado: any): void {
    this.empleadoSeleccionado = empleado;
  }

  cerrarDetalles(): void {
    this.empleadoSeleccionado = null;
  }

  darBajaEmpleado(id: number): void {
    this.materialService.darBajaEmpleado(id).subscribe(() => {
      const empleado = this.empleados.find(e => e.id_empleado === id);
      if (empleado) {
        empleado.estado = 'Baja';
        empleado.fecha_baja = new Date().toISOString().split('T')[0]; // Establecer la fecha de baja como hoy
      }
      this.materialService.getMateriales().subscribe((materiales: any) => {
        this.materiales = materiales;
      });
    });
  }

  modificarEmpleado(empleado: any): void {
    this.empleadoModificando = { ...empleado };
  }

  guardarModificaciones(): void {
    let empleadoActualizado = { ...this.empleadoModificando };

    if (empleadoActualizado.estado === 'Alta') {
      // Si el estado es "Alta", solo enviar los campos permitidos
      empleadoActualizado = {
        id_empleado: empleadoActualizado.id_empleado,
        nombre_empleado: empleadoActualizado.nombre_empleado,
        apellido1_empleado: empleadoActualizado.apellido1_empleado,
        apellido2_empleado: empleadoActualizado.apellido2_empleado,
        fecha_alta: empleadoActualizado.fecha_alta,
        correo: empleadoActualizado.correo
      };
    }

    this.materialService.updateEmpleado(empleadoActualizado).subscribe(() => {
      const index = this.empleados.findIndex(e => e.id_empleado === this.empleadoModificando.id_empleado);
      if (index !== -1) {
        this.empleados[index] = { ...this.empleadoModificando };
      }
      this.empleadoModificando = null;
    });
  }

  cancelarModificacion(): void {
    this.empleadoModificando = null;
  }

  quitarAsignacion(materialId: number, empleadoId: number): void {
    this.materialService.quitarAsignacion(materialId, empleadoId).subscribe(() => {
      const material = this.materiales.find(m => m.id_material === materialId);
      if (material) {
        material.estado = 'En stock';
        material.empleado_asignado = null;
        material.fecha_asignacion = null;
        material.anterior_asignado = empleadoId;
      }
    });
  }
  descargarTabla(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.empleados);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
    XLSX.writeFile(wb, 'Empleados.xlsx');
  }
}