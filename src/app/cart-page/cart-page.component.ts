import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, priceSummary, Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:Cart[] |undefined;
  
  

  
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0,
  }

 
 

  constructor(private productService:ProductService , private router:Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    

    this.loadDetails();
   
  }

  checkout(){
    this.router.navigate(['checkout']);
  }

  loadDetails(){
    this.productService.currentCart().subscribe((result)=>{
      
      this.cartData=result;
      
      let priceTotal=0;
      result.forEach((item)=>{
        if(item.quantity){
          priceTotal=priceTotal + (+ item.price * +item.quantity);
        }
        
      });
      this.priceSummary.price=priceTotal;
      this.priceSummary.discount=10/100*priceTotal;
      this.priceSummary.tax=10/100*priceTotal;
      this.priceSummary.delivery=100;
      this.priceSummary.total=priceTotal-(10/100*priceTotal)+100+(10/100*priceTotal);
      if(this.cartData.length==0){
        this.router.navigate(['/']);
      }
    })

    
  }

  removeFromCart(cartId:number | undefined){
    cartId  && this.productService.removeToCart(cartId).subscribe((result) => {
  if (result) {
    console.warn('result', result);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.productService.getCartList(userId);
    //////////////////////////////////////////
    this.loadDetails();
  }
})
}
 
   
}
