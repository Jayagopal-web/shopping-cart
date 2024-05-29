import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId: string | null = sessionStorage.getItem('ID'); // Retrieve session ID
  cartItems: any[] = []; // Declare cartItems array
  totalPrice: number = 0; // Variable to store total price
  cartKey :string ='';

  constructor() { 
    // const cartKey = 'cart_' + this.userId;
  
    // // Retrieve the existing cart items from localStorage
    // let cartItems: any[] = JSON.parse(localStorage.getItem(cartKey) || '[]');
    // console.log(cartItems);
    // console.log(cartItems.length)
  }

  ngOnInit(): void {
    this.cartKey = 'cart_' + this.userId;
  
    // Retrieve the existing cart items from localStorage
    // this.cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    this.getCartItems();
    console.log(this.cartItems);
    console.log(this.cartItems.length)
    this.calculateTotalPrice();
  }
cart_item(){
  return this.cartItems;
}
getCartItems(): void {
  this.cartKey = 'cart_' + this.userId;; // Local storage key for cart items
  // Retrieve cart items from local storage
  this.cartItems = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  // Calculate total price
  this.calculateTotalPrice();
}
calculateTotalPrice(): void {
  this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price ? +item.price : 0) * (item.quantity ? +item.quantity : 0), 0);
}
removeItem(index: number): void {
  // Remove item from cartItems array
  this.cartItems.splice(index, 1);
  console.log(this.cartItems)
  // Update local storage
  localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  // Recalculate total price
  this.calculateTotalPrice();
}
}
