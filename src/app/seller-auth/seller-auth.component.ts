import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, Products, SignUp } from '../datatypes';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService , private router:Router){
  }
  showLogin:Boolean=false;
  iserror:string='';

   ngOnInit(): void {
    this.seller.reloadSeller();
  }


  signUp(data:SignUp){
    
    this.seller.userSignUp(data);
  }

  login(data:Login){
    this.iserror='';
    
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.iserror='Email or Password is in-correct!';
      }
    })
    
  }
  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
  }

 
}
