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
  userId:string | null = '';
  LoginText:string = 'Login';
  formData:any;
  fname:string | null ='';
  lname:string | null ='';
  userName:string ='';
  userProfile:string = 'user-profile-img profile';

  constructor(private router: Router,private httpClient: HttpClient,private sharedService:SharedService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is the listing page
        this.showSearchBar = event.urlAfterRedirects.includes('/listing');
      }
    });

    this.userId = sessionStorage.getItem('ID');
    this.fname = sessionStorage.getItem('firstName');
    this.lname = sessionStorage.getItem('lastName');

    const formDataString = localStorage.getItem('formData');
    this.formData = formDataString ? JSON.parse(formDataString) as FormData : null;
    
    

    if(this.userId!=null && this.fname!=null && this.lname!=null){
      this.LoginText = 'Logout';
      const firstLetterFname = this.fname.charAt(0).toUpperCase();
      const firstLetterLname = this.lname.charAt(0).toUpperCase();
      this.userName = `${firstLetterFname}${firstLetterLname}`;    
      
      this.userProfile = 'user-profile-img profile block';
    }
  }
  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.sharedService.updateSearchTerm(searchTerm);
  }
  loginBtn(){
    if(this.userId!=null){
      this.formData[this.userId].login= 'inactive';
      localStorage.setItem('formData', JSON.stringify(this.formData));
      sessionStorage.clear();
    }
  }
}
