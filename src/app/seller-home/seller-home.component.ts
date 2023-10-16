import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../datatypes';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  constructor(private route:Router, private sellerService:SellerService , private productService:ProductService){}

  ProductList!:Products[];
  productDeleteMessage:string |undefined;
  icon=faTrash;
  editIcon=faEdit;


  
  ngOnInit(): void {
    this.List();
  }

  deleteProduct(id:number){
      
      this.productService.deleteProducts(id).subscribe((result)=>{
        if(result){
          this.productDeleteMessage='Product Sucessfully Delted!'
          this.List(); 
        }

        setTimeout(()=>{
          this.productDeleteMessage=undefined;
        },3000);
        
      })
  }

  List(){
    this.productService.productList().subscribe((result)=>{
    
      this.ProductList=result;
     })
  }


 
  

}
