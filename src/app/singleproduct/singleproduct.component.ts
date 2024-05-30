import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  singleproductId: string | null = null;
  name: any;
  thumbnail:any;
  price:number =0;

  singleResult: any = null;
  mainImage: string = '';
  userId: string | null = sessionStorage.getItem('ID'); // Retrieve session ID

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

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
  let cartItems: any[] = JSON.parse(localStorage.getItem(cartKey) || '[]');
console.log(cartItems);
  // Check if the product already exists in the cart
  const existingItemIndex = cartItems.findIndex(item => item.productId === this.singleproductId);
  
  if (existingItemIndex !== -1) {
    // If the product already exists, increment the quantity
    cartItems[existingItemIndex].quantity++;
  } else {
    // If the product doesn't exist, add it to the cart with quantity 1
    cartItems.push({
       productId: this.singleproductId,
       name: this.singleResult.title,
       thumbnail: this.singleResult.thumbnail,
          price: this.singleResult.price,
        quantity: 1 });
  }

  // Store the updated cart items back in localStorage
  localStorage.setItem(cartKey, JSON.stringify(cartItems));

  alert('Product added to cart successfully!');
  window.location.reload();
}


  // getStars(rating: number): number[] {
  //   return Array(Math.round(rating)).fill(0);
  // }
}
