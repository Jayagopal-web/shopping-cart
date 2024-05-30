import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isMenuScrolled: boolean = false;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  scrollCheck(){
    if(window.pageYOffset > 100)
      this.isMenuScrolled = true;
    else
      this.isMenuScrolled = false
  }

  scrollToTop(){
    document.body.scrollIntoView({behavior: 'smooth'})
  }
}
