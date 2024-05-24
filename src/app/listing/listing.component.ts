import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  category: string | null = null;
  products: any[] = [];
  
  // toggle ngClass name
  hamburgerClass = 'hamburger'
  filterClass = 'filters'
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  hamburger = document.querySelector(".hamburger") as HTMLDivElement;
  navMenu = document.querySelector(".filters") as HTMLDivElement;

  toggle(){
    if(this.hamburgerClass == 'hamburger'){
      this.hamburgerClass = 'hamburger active'; 
      this.filterClass = 'filters active' 
    }else{
      this.hamburgerClass = 'hamburger';
      this.filterClass = 'filters' 
    }
    // this.navMenu.classList.toggle('active');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      console.log(this.category);
      
      if (this.category) {
        this.fetchProducts(this.category);
      }
    });
  }

  fetchProducts(category: string): void {
    this.httpClient.get<any>(`https://dummyjson.com/products/category/${category}`).subscribe(result => {
      this.products = result.products;
      console.log(this.products);
      
    });
  }

}
