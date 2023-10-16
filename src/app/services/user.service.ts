import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from '../datatypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient , private route:Router) { }
  invalidUser= new EventEmitter<boolean>(false);

  
 
  userSignUp(user:SignUp){
    
    return this.http.post("http://localhost:3000/users" , user , {observe:'response'}).subscribe((result)=>{
     if(result){
      
      localStorage.setItem('user' , JSON.stringify(result.body));
      this.route.navigate(['/']); 
      
      
     }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      
      this.route.navigate(['/']);
    }
  }

  userLogin(data:Login){
    return this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}` , {observe:'response'}).
    subscribe((result)=>{
      // if(result){
      //   console.warn(result);
      // }
      if(result && result.body?.length){
        this.invalidUser.emit(false);
        
        localStorage.setItem('user' ,JSON.stringify(result.body[0]))
        this.route.navigate(['/']);
      }else{
        this.invalidUser.emit(true);
      }
      
    })
  }
}
