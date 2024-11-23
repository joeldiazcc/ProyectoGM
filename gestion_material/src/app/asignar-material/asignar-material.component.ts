import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-asignar-material',
  templateUrl: './asignar-material.component.html',
  styleUrls: ['./asignar-material.component.css']
})
export class AsignarMaterialComponent implements OnInit {
  empleados: any[] = [];
  materiales: any[] = [];
  materialesFiltrados: any[] = [];
  asignacion = { empleado_id: '', tipo_material: '', material_id: '', fecha_asignacion: '' };
  mensaje: string | null = null;
  caracteristicas: string | null = null;

  constructor(private materialService: MaterialService, private orderPipe: OrderPipe) {}

  ngOnInit(): void {
    this.materialService.getEmpleados().subscribe((data: any) => {
      this.empleados = this.orderPipe.transform(
        data.filter((empleado: any) => empleado.estado !== 'Baja'),
        ['nombre_empleado', 'apellido1_empleado']
      );
    });
    this.materialService.getMateriales().subscribe((data: any) => {
      this.materiales = data;
    });
  }

  filtrarMateriales(): void {
    this.materialesFiltrados = this.orderPipe.transform(
      this.materiales.filter(material => 
        material.tipo === this.asignacion.tipo_material && material.estado === 'En stock'
      ),
      'nombre_material'
    );
  }

  onMaterialChange(): void {
    const materialSeleccionado = this.materialesFiltrados.find(material => material.id_material === this.asignacion.material_id);
    this.caracteristicas = materialSeleccionado ? materialSeleccionado.caracteristicas : null;
  }

  asignarMaterial(): void {
    if (!this.asignacion.fecha_asignacion) {
      this.asignacion.fecha_asignacion = new Date().toISOString().split('T')[0]; // Establecer la fecha de hoy por defecto
    }

    this.materialService.asignarMaterial(this.asignacion).subscribe((response: any) => {
      this.mensaje = 'Material asignado correctamente';
      setTimeout(() => this.mensaje = null, 3000); // Ocultar el mensaje después de 3 segundos
    }, (error) => {
      console.error('Error al asignar material:', error);
      this.mensaje = 'Error al asignar material';
      setTimeout(() => this.mensaje = null, 3000); // Ocultar el mensaje después de 3 segundos
    });
  }
}
