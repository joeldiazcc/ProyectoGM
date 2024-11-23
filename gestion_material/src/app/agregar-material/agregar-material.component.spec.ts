import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { MaterialService } from '../services/material.service';
import { AgregarEmpleadoComponent } from './agregar-empleado.component';

@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.component.html',
  styleUrls: ['./agregar-material.component.css']
})
export class AgregarMaterialComponent implements OnInit {
  nuevoMaterial = { nombre_material: '', tipo: '', estado: 'En stock', empleado_asignado: '', caracteristicas: '', fecha_asignacion: '', anterior_asignado: '' };
  empleados: any[] = [];
  mensaje: string | null = null;

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materialService.getEmpleados().subscribe((data: any) => {
      this.empleados = data;
    });
  }

  agregarMaterial(): void {
    this.materialService.addMaterial(this.nuevoMaterial).subscribe((material: any) => {
      console.log('Material agregado:', material);
      this.mensaje = 'Material agregado correctamente';
      this.nuevoMaterial = { nombre_material: '', tipo: '', estado: 'En stock', empleado_asignado: '', caracteristicas: '', fecha_asignacion: '', anterior_asignado: '' }; // Limpiar el formulario
      setTimeout(() => this.mensaje = null, 3000); // Ocultar el mensaje después de 3 segundos
    });
  }
}

describe('AgregarEmpleadoComponent', () => {
  let component: AgregarEmpleadoComponent;
  let fixture: ComponentFixture<AgregarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
      declarations: [AgregarEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
