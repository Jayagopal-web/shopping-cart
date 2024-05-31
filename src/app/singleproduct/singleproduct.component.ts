import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';import { Location } from '@angular/common';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  singleproductId: string | null = null;
  name: any;
  thumbnail: any;
  price: number = 0;

  singleResult: any = null;
  mainImage: string = '';
  userId: string | null = sessionStorage.getItem('ID'); // Retrieve session ID
    isAdditionalInfoVisible: boolean = false; // To track visibility

  cartItemCount: any;
  cartItems: any = [];

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,private cartService: CartService,
    private location: Location,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.singleproductId = params.get('singleproductId');
      if (this.singleproductId) {
        this.fetchSingleProduct(this.singleproductId);
      }
    });
  }

  fetchSingleProduct(singleproductId: string): void {
    this.httpClient.get<any>(`https://dummyjson.com/products/${singleproductId}`).subscribe(
      (single) => {
        this.singleResult = single;
        console.log(single);
        this.mainImage = single.thumbnail;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onImageClick(imageUrl: string) {
    this.singleResult.thumbnail = imageUrl;
  }

  addToCart(): void {
    if (!this.userId) {
      alert('Please log in to add items to the cart.');
      return;
    }

    const cartKey = 'cart_' + this.userId;

    // Retrieve the existing cart items from localStorage
     this.cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]');
    console.log(this.cartItems);

    // Check if the product already exists in the cart
    const existingItemIndex = this.cartItems.findIndex((item:any) => item.productId === this.singleproductId);

    if (existingItemIndex !== -1) {
      // If the product already exists, increment the quantity
      this.cartItems[existingItemIndex].quantity++;
    } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      this.cartItems.push({
        productId: this.singleproductId,
        name: this.singleResult.title,
        thumbnail: this.singleResult.thumbnail,
        price: this.singleResult.price,
        quantity: 1
      });
    }

    // Store the updated cart items back in localStorage
    localStorage.setItem(cartKey, JSON.stringify(this.cartItems));

    alert('Product added to cart successfully!');
    // window.location.reload();\
 
this.cartService.updateCartItems(this.cartItems);
  }
   backClicked() {
    this.location.back();
  }

  toggleAdditionalInfo() {
    this.isAdditionalInfoVisible = !this.isAdditionalInfoVisible;
  }
}
