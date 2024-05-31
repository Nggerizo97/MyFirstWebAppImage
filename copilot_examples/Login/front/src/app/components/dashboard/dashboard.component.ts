import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

  
  constructor(private toastr: ToastrService) { }
  

  images = [
    { url: '../../../assets/img/img1.jpg', name: 'Imagen 1', customPrice: 1,isAddedToCart: true },
    { url: '../../../assets/img/img2.jpg', name: 'Imagen 2', customPrice: 1,isAddedToCart: true },
    // Agrega más imágenes aquí
  ];
  

  cartItems: {  name: string; 
    customPrice: number; 
    quantity: number; 
    totalPrice: number; 
    isAddedToCart: boolean; 
  }[] = [];
  
  



  selectImage(image: any) {
    
  }

  addToCart(image: any) {
    // Check if the price is valid
    if (image.customPrice >= 1) {
      // Find if the image is already in the cart
      const existingImage = this.cartItems.find(item => item.name === image.name);
      if (existingImage) {
        // Increase the quantity and total price if the image is already in the cart
        existingImage.quantity += 1;
        existingImage.totalPrice += image.customPrice;
      } else {
        // Add a new entry to the cart if the image is not in the cart
        this.cartItems.push({
          ...image,
          quantity: 1,
          totalPrice: image.customPrice
        });
        // Set isAddedToCart to true
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
    // Encuentra la imagen en el array de imágenes
    const image = this.images.find(img => img.name === this.cartItems[index].name);
    if (image) {
      // Establece isAddedToCart en false
      image.isAddedToCart = false;
    }
  
    // Elimina la imagen del carrito
    this.cartItems.splice(index, 1);
  }
  checkout() {
    
  }
}
