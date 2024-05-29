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
  singleResult: any = null;
  mainImage: string = '';

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

  // getStars(rating: number): number[] {
  //   return Array(Math.round(rating)).fill(0);
  // }
}
