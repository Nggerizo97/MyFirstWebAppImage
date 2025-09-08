import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getAuthenticationStatus().subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
    // Get cart item count from localStorage or service
    this.updateCartCount();
  }

  updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.length;
  }

  logout(): void {
    this.authService.removeToken();
    localStorage.removeItem('cart');
    this.cartItemCount = 0;
    this.router.navigate(['/gallery']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToGallery(): void {
    this.router.navigate(['/gallery']);
  }
}
