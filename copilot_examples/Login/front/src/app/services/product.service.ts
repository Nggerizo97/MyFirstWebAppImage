import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category?: string;
  available?: boolean;
}

export interface Order {
  id?: number;
  userId: number;
  productId: number;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  paymentId?: string;
  paymentMethod?: 'paypal' | 'stripe' | 'test';
  createdAt?: string;
  product?: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "api/product/";
  }

  getPublicProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}public`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createOrder(productId: number, amount: number, paymentMethod: string = 'test'): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { productId, amount, paymentMethod };
    return this.http.post(`${this.myAppUrl}api/order/`, body, { headers });
  }

  getOrders(): Observable<Order[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Order[]>(`${this.myAppUrl}api/order/`, { headers });
  }

  updateOrderStatus(orderId: number, status: string, paymentId?: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { status, paymentId };
    return this.http.put(`${this.myAppUrl}api/order/${orderId}/status`, body, { headers });
  }
}