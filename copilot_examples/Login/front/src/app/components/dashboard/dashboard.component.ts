import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
quantityToRemove: any;
newPrice: any;
  constructor(private toastr: ToastrService) { }

  images = [
    { url: '../../../assets/img/img1.jpg', name: 'Imagen 1', customPrice: 1, isAddedToCart: true },
    { url: '../../../assets/img/img2.jpg', name: 'Imagen 2', customPrice: 1, isAddedToCart: true },
    // Agrega más imágenes aquí
  ];

  cartItems: { name: string; customPrice: number; quantity: number; totalPrice: number; isAddedToCart: boolean; }[] = [];

  selectImage(image: any) {
    // Implementar lógica aquí
  }

  addToCart(image: any) {
    if (image.customPrice < 1) {
      this.toastr.error("The price should be 1 dollar or more", "Error");}

    if (image.customPrice >= 1) {
      const existingImage = this.cartItems.find(item => item.name === image.name);
      if (existingImage) {
        existingImage.quantity += 1;
        existingImage.totalPrice += image.customPrice;
      } else {
        this.cartItems.push({
          ...image,
          quantity: 1,
          totalPrice: image.customPrice
        });
        image.isAddedToCart = true;
      }
    } else {
      this.toastr.error("The price should be 1 dollar or more", "Error");
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  getTotalQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  removeFromCart(index: number) {
    const image = this.images.find(img => img.name === this.cartItems[index].name);
    if (image) {
      image.isAddedToCart = false;
    }
    this.cartItems.splice(index, 1);
  }

  updatePrice(image: any, newPrice: number) {
    if (newPrice < 0) {
    this.toastr.error("Price cannot be negative", "Error");
  } else {
    image.customPrice = newPrice;
  }
  }

  removeQuantity(image: any, quantityToRemove: number) {
    const cartItem = this.cartItems.find(item => item.name === image.name);
    if (!Number.isInteger(quantityToRemove)) {
      this.toastr.error("You can only remove integer quantities", "Error");
    } else if (quantityToRemove < 0) {
      this.toastr.error("Cannot remove negative quantity", "Error");
    } else {
      const cartItem = this.cartItems.find(item => item.name === image.name);
      if (cartItem) {
        if (cartItem.quantity < quantityToRemove) {
          this.toastr.error("You can't remove more items than exist in the cart", "Error");
        } else {
          cartItem.quantity -= quantityToRemove;
          if (cartItem.quantity === 0) {
            const index = this.cartItems.indexOf(cartItem);
            this.removeFromCart(index);
          } else {
            cartItem.totalPrice = cartItem.quantity * cartItem.customPrice;
          }
        }
      }
    }
  }
  checkout() {
    // Implementar lógica aquí
  }
}