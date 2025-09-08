import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService, Product } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

interface CartItem {
  productId: number;
  name: string;
  imageUrl: string;
  customPrice: number;
  quantity: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  images: Product[] = [];
  cartItems: CartItem[] = [];
  loading: boolean = true;
  isAuthenticated: boolean = false;

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.productService.getPublicProducts().subscribe({
      next: (products) => {
        this.images = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.toastr.error('Error loading images', 'Error');
        this.loading = false;
      }
    });
  }

  loadCart(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(image: Product, customPrice?: number): void {
    if (!this.isAuthenticated) {
      this.toastr.warning('Please login to add items to cart', 'Login Required');
      this.router.navigate(['/login']);
      return;
    }

    const price = customPrice || image.price;
    
    if (price < 1) {
      this.toastr.error('The price should be $1 or more', 'Error');
      return;
    }

    // Check if item already in cart (for images, each should be unique)
    const existingItem = this.cartItems.find(item => item.productId === image.id);
    if (existingItem) {
      this.toastr.warning('Image already in cart', 'Warning');
      return;
    }

    const cartItem: CartItem = {
      productId: image.id!,
      name: image.name,
      imageUrl: image.imageUrl,
      customPrice: price,
      quantity: 1 // Always 1 for images
    };

    this.cartItems.push(cartItem);
    this.saveCart();
    this.toastr.success('Image added to cart', 'Success');
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
    this.toastr.info('Item removed from cart', 'Info');
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.customPrice * item.quantity), 0);
  }

  getTotalQuantity(): number {
    return this.cartItems.length; // For images, it's always the count
  }

  checkout(): void {
    if (!this.isAuthenticated) {
      this.toastr.warning('Please login to checkout', 'Login Required');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.toastr.warning('Your cart is empty', 'Warning');
      return;
    }

    // Process each item as a separate order
    let completedOrders = 0;
    const totalOrders = this.cartItems.length;

    this.cartItems.forEach((item, index) => {
      this.productService.createOrder(item.productId, item.customPrice, 'test').subscribe({
        next: (response) => {
          completedOrders++;
          
          if (completedOrders === totalOrders) {
            this.toastr.success('All orders created successfully!', 'Success');
            this.cartItems = [];
            this.saveCart();
          }
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.toastr.error(`Error creating order for ${item.name}`, 'Error');
        }
      });
    });
  }

  selectImage(image: Product): void {
    // Could implement image preview modal here
    this.toastr.info(`Selected: ${image.name}`, 'Info');
  }
}