import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  constructor(private routeRead:ActivatedRoute , private product:ProductService , private router:Router){}
  productData:undefined | Products;
  updateMessage:undefined | string;
  ngOnInit(): void {
    let productId=this.routeRead.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      
      this.productData=result;
    })
    
  }
  submit(data:Products){
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      
      if(result){
        this.updateMessage='Product Updated Sucessfully!'
      }
  
      setTimeout(()=>{
        this.updateMessage=undefined;
        this.router.navigate(['seller-home']);
      },2000)

      
    })
  }
}
