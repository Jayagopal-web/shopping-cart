import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showSearchBar: boolean = false;
  searchValue:string="";
  constructor(private router: Router,private httpClient: HttpClient,private sharedService:SharedService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is the listing page
        this.showSearchBar = event.urlAfterRedirects.includes('/listing');
      }
    });
    this.sharedService.currentSearchTerm.subscribe(term => {
      this.searchValue = term;
      this.cdr.detectChanges();
    });
  }
  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.sharedService.updateSearchTerm(searchTerm);
  }
}
