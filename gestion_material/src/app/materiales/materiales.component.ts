import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.css'
})
export class MaterialesComponent implements OnInit {
  materiales: any[] = [];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.materialService.getMateriales().subscribe((data)=>{
      this.materiales = data; // Guardar datos materiales
    });
  }
}
