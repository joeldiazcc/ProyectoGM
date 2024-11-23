import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  mensaje: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.http.post('http://localhost:3000/api/register', { username: this.username, password: this.password })
      .subscribe((response: any) => {
        this.mensaje = 'Usuario registrado exitosamente';
        setTimeout(() => {
          this.mensaje = null;
          this.router.navigate(['/login']);
        }, 3000);
      }, (error) => {
        console.error('Error al registrar usuario:', error);
        this.mensaje = 'Error al registrar usuario';
      });
  }
}
