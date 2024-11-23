import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http.post('http://localhost:3000/api/login', { username: this.username, password: this.password })
      .subscribe((response: any) => {
        if (response.auth && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/empleados']);
        } else {
          console.error('Error al iniciar sesión');
        }
      }, (error) => {
        console.error('Error al iniciar sesión:', error);
      });
  }
}
