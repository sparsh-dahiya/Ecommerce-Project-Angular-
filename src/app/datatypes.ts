import { NonNullableFormBuilder } from "@angular/forms";

export interface SignUp{
    name:string;
    password:string;
    email:string;
    
}


export interface Login{
    email:string;
    password:string;
}

export interface Products{
    name:string;
    price:number;
    color:string;
    category:string;
    description:string;
    image:string;
    id:number;
    quantity:undefined |number;
    productId:undefined | number;
}

export interface Cart{
    name:string;
    price:number;
    color:string;
    category:string;
    description:string;
    image:string;
    id:undefined | number,
    quantity:undefined |number;
    userId:number;
    productId:number;
}

export interface priceSummary{
    price:number;
    discount:number;
    tax:number;
    delivery:number;
    total:number;
}

export interface orderDetails{
    email:string;
    address:string;
    contact:string;
    userData:number;
    totalPrice:number;
    id:number |undefined;
    


}