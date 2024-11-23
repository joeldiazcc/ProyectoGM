import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion_material';
  isMenuOpen = true; // Propiedad para controlar la visibilidad del menú

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Método para alternar el estado del menú
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    this.router.navigate(['/login']); // Navegar a la página de login
  }
}
