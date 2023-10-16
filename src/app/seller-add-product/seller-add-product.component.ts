import { Component } from '@angular/core';
import { Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  
  constructor(private product:ProductService){}
  addProductMessage:string | undefined;
  
  submit(data:Products){
    this.product.addProduct(data).subscribe((result:any)=>{
      
      if(result){
        this.addProductMessage='Product Added Sucessfully';
      }
      setTimeout(()=>{this.addProductMessage=undefined},3000)
      
    })
  }
}
