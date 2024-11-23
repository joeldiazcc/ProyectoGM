import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.component.html',
  styleUrls: ['./agregar-material.component.css']
})
export class AgregarMaterialComponent implements OnInit {
  nuevoMaterial = { nombre_material: '', tipo: '', caracteristicas: '' };
  mensaje: string | null = null;

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {}

  agregarMaterial(): void {
    const materialData = {
      ...this.nuevoMaterial,
      estado: 'En stock', // Establecer el estado por defecto como 'En stock'
      empleado_asignado: null,
      fecha_asignacion: null,
      anterior_asignado: null
    };

    this.materialService.addMaterial(materialData).subscribe((material: any) => {
      console.log('Material agregado:', material);
      this.mensaje = 'Material agregado correctamente';
      this.nuevoMaterial = { nombre_material: '', tipo: '', caracteristicas: '' }; // Limpiar el formulario
      setTimeout(() => this.mensaje = null, 3000); // Ocultar el mensaje después de 3 segundos
    });
  }
}
