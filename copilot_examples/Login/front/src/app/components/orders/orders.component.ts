import { Component, OnInit } from '@angular/core';
import { ProductService, Order } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrders();
  }

  loadOrders(): void {
    this.productService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.toastr.error('Error loading order history', 'Error');
        this.loading = false;
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'failed':
        return 'badge bg-danger';
      case 'cancelled':
        return 'badge bg-secondary';
      default:
        return 'badge bg-light text-dark';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getPaidOrdersCount(): number {
    return this.orders.filter(o => o.status === 'paid').length;
  }

  getPendingOrdersCount(): number {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  getTotalSpent(): number {
    return this.orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0);
  }
}