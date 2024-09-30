import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  empleados: any[] = [];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materialService.getEmpleados().subscribe((data)=>{
      this.empleados = data; // Guardar datos empleados
    });
  }
}