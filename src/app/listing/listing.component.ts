import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit, OnDestroy {

  selectedCategory: string | null = 'All';
  priceRange: string | null = 'Default';
  category: string | null | Event = null;
  products: any[] = [];
  categoriesList: string[] = [];
  searchValue: string = '';
  searchProductsDetails: any[] = [];
  hamburgerClass = 'hamburger';
  filterClass = 'filters';
  firstSearch: boolean = true;
  beforeSearch: any[] = [];
  private searchTermSubscription!: Subscription;
  private initialLoad: boolean = true; // Flag to track initial load

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) { }

  toggle() {
    this.hamburgerClass = this.hamburgerClass === 'hamburger' ? 'hamburger active' : 'hamburger';
    this.filterClass = this.filterClass === 'filters' ? 'filters active' : 'filters';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.selectedCategory = this.category;
      if (this.category) {
        this.fetchProducts(this.category);
      }
    });

    this.getCategoriesList();
    this.searchTermSubscription = this.sharedService.currentSearchTerm.subscribe(term => {
      this.searchValue = term;
      this.search();
    });
  }

  ngOnDestroy(): void {
    if (this.searchTermSubscription) {
      this.searchTermSubscription.unsubscribe();
    }
    this.resetSearch();
  }

  resetSearch(): void {
    if (this.initialLoad) {
      this.initialLoad = false; // Reset the flag after the first call
      return;
    }
    this.searchValue = '';
    this.searchProductsDetails = [];
    this.firstSearch = true;
    this.products = [...this.beforeSearch]; // Ensure products are reset to beforeSearch state
  }

  search() {
    if (this.searchValue.trim() !== "") {
      this.searchProductsDetails = [];
      const searchTerms = this.searchValue.toLowerCase().split(" ");
      this.beforeSearch.forEach(element => {
        const titleLower = element.title.toLowerCase();
        const anyTermMatches = searchTerms.some(term => titleLower.includes(term));
        if (anyTermMatches) {
          this.searchProductsDetails.push(element);
        }
      });
      this.products = this.searchProductsDetails;
    } else if (!this.initialLoad) { // Prevent resetting during initial load
      this.products = [...this.beforeSearch];
    }
  }

  getCategoriesList(): void {
    this.httpClient.get<string[]>('https://dummyjson.com/products/category-list').subscribe((categories: string[]) => {
      this.categoriesList = categories;
    });
  }

  fetchProducts(category: string | Event): void {
    this.priceRange = "Default";
    if (category !== "All") {
      this.httpClient.get<any>(`https://dummyjson.com/products/category/${category}`).subscribe(result => {
        this.products = result.products;
        this.beforeSearch = [...this.products];
        this.sharedService.updateSearchTerm("");
        this.sharedService.getmessage();
      });
    } else {
      this.httpClient.get<any>('https://dummyjson.com/products?limit=0').subscribe(result => {
        this.products = result.products;
        this.selectedCategory = category;
        this.beforeSearch = [...this.products];
        this.sharedService.updateSearchTerm("");
        this.sharedService.getmessage();
      });
    }
  }

  onchange(value: Event) {
    const target = value.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.fetchProducts(selectedValue);
  }

  onPriceChange(value: Event) {
    const target = value.target as HTMLSelectElement;
    const selectedPrice = target.value;

    if (selectedPrice === "LowToHigh") {
      this.sortProducts('asc');
    } else if (selectedPrice === "HighToLow") {
      this.sortProducts('desc');
    }
  }

  sortProducts(order: 'asc' | 'desc') {
    if (this.selectedCategory !== "All") {
      this.httpClient.get<any>(`https://dummyjson.com/products/category/${this.selectedCategory}?sortBy=price&order=${order}`).subscribe(result => {
        this.products = result.products;
        this.beforeSearch = [...this.products];
      });
    } else {
      this.httpClient.get<any>(`https://dummyjson.com/products?limit=0&sortBy=price&order=${order}`).subscribe(result => {
        this.products = result.products;
        this.beforeSearch = [...this.products];
      });
    }
  }
}
