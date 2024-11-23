import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialService } from './material.service';

describe('MaterialService', () => {
  let service: MaterialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaterialService]
    });
    service = TestBed.inject(MaterialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería obtener todos los empleados', () => {
    const dummyEmpleados = [
      { nombre_empleado: 'Juan', apellido1_empleado: 'Pérez', estado: 'Activo' },
      { nombre_empleado: 'María', apellido1_empleado: 'Gómez', estado: 'Inactivo' }
    ];

    service.getEmpleados().subscribe(empleados => {
      expect(empleados.length).toBe(2);
      expect(empleados).toEqual(dummyEmpleados);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/empleados`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmpleados);
  });

  afterEach(() => {
    httpMock.verify();
  });
});