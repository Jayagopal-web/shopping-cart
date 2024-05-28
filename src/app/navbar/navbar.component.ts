import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showSearchBar: boolean = false;
  searchvalue:string="";
  constructor(private router: Router,private httpClient: HttpClient,private sharedService:SharedService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is the listing page
        this.showSearchBar = event.urlAfterRedirects.includes('/listing');
      }
    });
  }
  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.sharedService.updateSearchTerm(searchTerm);
  }
}
