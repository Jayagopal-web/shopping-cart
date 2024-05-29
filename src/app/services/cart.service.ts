import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private authService: AuthService) {}

  // Get the unique cart key for the current session
  private getCartKey(): string | null {
    const sessionId = this.authService.getSessionId();
    return sessionId ? `cart_${sessionId}` : null;
  }

  // Get cart items for the current session
  getCartItems(): any[] {
    const cartKey = this.getCartKey();
    if (cartKey) {
      const cart = localStorage.getItem(cartKey);
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  // Add an item to the cart for the current session
  addToCart(product: any): void {
    const cartKey = this.getCartKey();
    if (cartKey) {
      const cartItems = this.getCartItems();
      cartItems.push(product);
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } else {
      console.error('User is not logged in');
    }
  }
}
