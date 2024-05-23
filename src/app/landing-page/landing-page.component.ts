import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  userList:any;
  constructor(private httpClient: HttpClient) { 
    this.userList=[];
  }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList(){
    this.httpClient.get('https://dummyjson.com/products/categories').subscribe((result:any)=>{
      this.userList=result;
    })
  }
}