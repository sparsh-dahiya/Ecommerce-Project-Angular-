import { Component, OnInit } from '@angular/core';
import { Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  popularProducts:undefined |Products[];
  trendyProducts:undefined | Products[];

  constructor(private productService: ProductService){}
  removeCart: boolean = false;
  ngOnInit(): void {
    this.productService.popularProducts().subscribe((result)=>{
      
      this.popularProducts=result;
    })

    this.productService.trendyProducts().subscribe((result)=>{
      this.trendyProducts=result;
    })
  }

  
 
}
