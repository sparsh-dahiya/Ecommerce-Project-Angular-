import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Products } from '../datatypes';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  productInfo: undefined | Products;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cartIds: undefined | Products;
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productID');
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productInfo = result;

      let cart = localStorage.getItem('cartData');
      if (productId && cart) {
        let items = JSON.parse(cart);
        items = items.filter((item: Products) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
    })
    let user = localStorage.getItem('user');

    if (user) {
      let userId = user && JSON.parse(user).id;
      this.productService.getCartList(userId);
      this.productService.cartEmit.subscribe((result) => {
        let item = result.filter((item: Products) => productId?.toString() === item.productId?.toString())
        if (item.length) {
          this.cartIds = item[0];
          this.removeCart = true;
        }
      })
    }

  }
  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity = this.productQuantity + 1;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity = this.productQuantity - 1;
    }

  }

  AddToCart() {
    if (this.productInfo) {
      this.productInfo.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productInfo)
        this.removeCart = true;
      } else {

        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        //console.warn('userId=',userId);
        let cartData: Cart = {
          ...this.productInfo,
          userId,
          productId: this.productInfo.id
        }

        delete cartData.id;


        this.productService.AddToCart(cartData).subscribe((result) => {
          if (result) {
            console.warn('added to DB file when user is logged in');
          }
        });
        this.productService.getCartList(userId);
        this.removeCart = true;

      }
    }
  }

  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeFromcart(productId);
      this.removeCart = false;
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(typeof this.cartIds?.id);
      this.cartIds && this.productService.removeToCart(this.cartIds.id).subscribe((result) => {
        if (result) {
          console.warn('result', result);
          
          this.productService.getCartList(userId);


        }
      })
      this.removeCart=false;
    }

  }
}
