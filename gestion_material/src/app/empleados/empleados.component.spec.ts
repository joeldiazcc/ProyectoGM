import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { EmpleadosComponent } from './empleados.component';

describe('EmpleadosComponent', () => {
  let component: EmpleadosComponent;
  let fixture: ComponentFixture<EmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
      declarations: [EmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
