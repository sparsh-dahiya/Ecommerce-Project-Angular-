import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, orderDetails } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private productService:ProductService , private route:Router){ }
  cartData:Cart[] | undefined;
  finalPrice:number | undefined;
  orderMessage:string | undefined;
  
  ngOnInit(): void {
    this.productService.currentCart().subscribe((result)=>{
      this.cartData=result;
      console.warn(this.cartData);
      let priceTotal=0;
      result.forEach((item)=>{
        if(item.quantity){
          priceTotal=priceTotal + (+ item.price * +item.quantity);
        }
      })
      this.finalPrice=priceTotal-(10/100*priceTotal)+100+(10/100*priceTotal);
    })
  }

  orderNow(data:{email:string, address:string, contact:string}){
    let user=localStorage.getItem('user');
    let userData=user && JSON.parse(user).id;
    if(this.finalPrice){
      let orderDetails :orderDetails={
        ...data,
        userData,
        totalPrice:this.finalPrice,
        id:undefined
      }
      
        this.cartData?.forEach((item)=>{

          item.id && this.productService.deleteCartItems(item.id);
        }
      )
      
      


      this.productService.orderFinal(orderDetails).subscribe((result)=>{
        if(result){
          this.orderMessage="Your Order has been Placed Sucessfully!"
          setTimeout(() => {
            this.route.navigate(['my-orders']);   
            this.orderMessage=undefined;   
          },3000);
        }
      })
    }
  }
  

}
