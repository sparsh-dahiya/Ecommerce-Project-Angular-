import { Component, OnInit } from '@angular/core';
import { orderDetails } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  constructor( private productService:ProductService){}
  orderData:orderDetails []|undefined;
  orderId:number | undefined;
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number | undefined){
    orderId &&  this.productService. deleteOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    return this.productService.getorderData().subscribe((result)=>{
      this.orderData=result;
    })
  }
  
}
