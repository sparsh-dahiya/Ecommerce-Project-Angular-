import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string='default';
  cartItem:number=0;
  sellerName:string='';
  searchResult:undefined |Products[];
  userName:string='';
  constructor(private router:Router , private product:ProductService){}
  ngOnInit(): void {
    this.router.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          
          
          //if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller');
            let sellerData= sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
            this.menuType='seller';
            
            
         //}
        } else if(localStorage.getItem('user')){

          let userStore=localStorage.getItem('user');
          let userData= userStore && JSON.parse(userStore);
          this.userName=userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
        } else {
          
          this.menuType='default'; 
        }
      }
    })
    let cartNumber=localStorage.getItem('cartData');
    if(cartNumber){
      this.cartItem=JSON.parse(cartNumber).length;
    }
    this.product.cartEmit.subscribe((result)=>{
      this.cartItem=result.length;
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
    
  }

  logoutUser(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartEmit.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
        
        if(result.length<5){
          result.length=5;
        }
        this.searchResult=result;
      }) 
      
    }
  }

  hideSearchResult(){
    this.searchResult=undefined;
  }

  submitSearch(value:string){
    
      this.router.navigate([`search/${value}`])
    
      }

  redirectToDetails(id:number){
    this.router.navigate(['/details/'+id]);
  }   

}