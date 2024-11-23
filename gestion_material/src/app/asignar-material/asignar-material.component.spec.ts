import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { AsignarMaterialComponent } from './asignar-material.component';

describe('AsignarMaterialComponent', () => {
  let component: AsignarMaterialComponent;
  let fixture: ComponentFixture<AsignarMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], 
      declarations: [AsignarMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
