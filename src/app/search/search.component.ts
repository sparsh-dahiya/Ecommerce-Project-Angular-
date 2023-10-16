import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  productResult:undefined |Products[];
  constructor(private route:ActivatedRoute , private product:ProductService, private router:Router){}
  ngOnInit(): void {
    let query=this.route.snapshot.paramMap.get('query');
    
    query && this.product.searchProducts(query).subscribe((result)=>{
        this.productResult=result;
      })
    
     
    
    
      
    
  }

 

}
