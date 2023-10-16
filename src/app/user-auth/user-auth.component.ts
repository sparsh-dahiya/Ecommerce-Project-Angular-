import { Component, OnInit } from '@angular/core';
import { Cart, Login, Products, SignUp } from '../datatypes'
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  invalidMessage: string = '';
  constructor(private userService: UserService, private productService: ProductService) { }
  showLogin: boolean = true;
  ngOnInit(): void {

    this.userService.userAuthReload();
    

  }
  SignUp(data: SignUp) {

    this.userService.userSignUp(data);

  }
  Login(data: Login) {
    this.userService.userLogin(data);
  
    

    this.userService.invalidUser.subscribe((result) => {
      if (result) {
        this.invalidMessage = 'Either Email or Password is incorrect';
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }


  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let cart = localStorage.getItem('cartData');
    let user= localStorage.getItem('user');
   
      let userId = user && JSON.parse(user).id;
      console.warn(userId);
    if (cart) {
      let parsedCart: Products[] = JSON.parse(cart);
      
        
      

      parsedCart.forEach((product:Products , index)=>{
        let cartObject :Cart={
          ...product,
          productId:product.id,
          userId:userId,
        };
        //console.warn('when user is logged after adding the product in the cart', cartObject);
        delete cartObject.id;
        
       setTimeout(()=>{
        this.productService.AddToCart(cartObject).subscribe((result)=>{
          if(result){
            //console.warn('item stored in DB');
          }
        }) 
        if(parsedCart.length===index+1){
          localStorage.removeItem('cartData');
        }
       },2000)
      })
      
      
      
    }
    this.productService.getCartList(userId);
  }
}









