import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../datatypes';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MinValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isLoggedin= new BehaviorSubject<boolean>(false);
  
  isLoginError= new EventEmitter<boolean>(false);

  

  constructor( private http: HttpClient , private router:Router) {
    
   }

  userSignUp(data:SignUp){
     this.http.post('http://localhost:3000/seller',data, {observe:'response'}).subscribe((result)=>{
      if(result){
        this.isLoggedin.next(true);
        
        
        localStorage.setItem('seller' , JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
        
      return this.isLoggedin;
      
    })
  }
   reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isLoggedin.next(true);
      this.router.navigate(['seller-home']);

        }
    }

  userLogin(data:Login){
    
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result:any)=>{
      
      if(result && result.body && result.body.length){
        
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      } else{
        this.isLoginError.emit(true);

        }
      }

    )
  }
}
