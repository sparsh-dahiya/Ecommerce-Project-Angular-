import { HttpClient} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, orderDetails, Products } from '../datatypes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  cartEmit= new EventEmitter<Products[] | []> ();

  addProduct(data:Products){
    return this.http.post('http://localhost:3000/products',data);
  }

  productList(){
    return this.http.get<Products[]>('http://localhost:3000/products');
  }

  deleteProducts(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<Products>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data:Products){
    return this.http.put<Products>(`http://localhost:3000/products/${data.id}` , data);
  }

  popularProducts(){
    return this.http.get<Products[]>('http://localhost:3000/products?_limit=6');
  }

  trendyProducts(){
    return this.http.get<Products[]>('http://localhost:3000/products?_limit=5')
  }

  searchProducts(query:string){
    return this.http.get<Products[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:Products){
   let cart=[];
   let cartData=localStorage.getItem('cartData');
   if(!cartData){
    localStorage.setItem('cartData' , JSON.stringify([data]))
    this.cartEmit.emit([data]);

   }else{
    cart=JSON.parse(cartData);
    cart.push(data);
    localStorage.setItem('cartData' , JSON.stringify(cart));
   }
   this.cartEmit.emit(cart);
  }

  removeFromcart(productId:number){
    let cartData=localStorage.getItem('cartData');
    if(cartData){
      let items=JSON.parse(cartData);
      items =items.filter((item:Products)=>productId!==item.id);
      localStorage.setItem('cartData' , JSON.stringify(items));
      this.cartEmit.emit(items);
    }
  }

  AddToCart(cartData:Cart){
    return this.http.post('http://localhost:3000/cart' , cartData);
  }

  getCartList(userId:number){
    return this.http.get<Products[]>(`http://localhost:3000/cart?userId=`+userId , {observe:'response'}).
    subscribe((result)=>{
      if(result && result.body){
        this.cartEmit.emit(result.body);
      }
       
    })
  }

  removeToCart(cartId:number){
  return this.http.delete(`http://localhost:3000/cart/`+cartId);
  }

  currentCart(){
    let userStore=localStorage.getItem('user');
    let userData= userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=`+userData.id);

  }

  orderFinal(data:orderDetails){
   return this.http.post('http://localhost:3000/orders' , data)
  }

  getorderData(){
    let userStore=localStorage.getItem('user');
    let userData= userStore && JSON.parse(userStore);
    return this.http.get<orderDetails[]>('http://localhost:3000/orders?userId='+userData.id);
  }

  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' +cartId , {observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartEmit.emit([])
      }
    })
  }

  deleteOrder(orderId:number){
      return this.http.delete('http://localhost:3000/orders/' +orderId);
  }
  

  
  
}
