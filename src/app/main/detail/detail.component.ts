import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { UserService } from 'src/app/service/user.service';

import * as $ from 'jquery';
import { CartService } from 'src/app/service/cart.service';




@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent  extends BaseComponent implements OnInit, AfterViewInit  {
  id: number = 0;
  product_detail: any=[];
  subTotal:any;

  product_all:any;
  product:any;

  detail_name: any;
  detail_cate: any;
  detail_default_price: any;
  detail_price: any;
  detail_img_src: any;
  detail_description: any;
  products:any[]=[];
  size:any;
  color:any;
  img :any;
  product_similar:any;
  $:any
  selectedOption:any;

  // biến nhận size và color
  selectedSize:any;
  selectedColor:any;

  category_name:any;
  constructor(injector: Injector, private user: UserService,private _router: ActivatedRoute,  private cartService: CartService ) {
    super(injector);
  }

  ngOnInit(): void {
      this.get_detail();
  }
   get_detail() {
    this.id = this._router.snapshot.params['id'];

   this.user.get_product(this.id).subscribe((data: any) => {

      console.log('nef',data);
      this.product_detail = data;
      this.detail_name = data.product.name;
      this.detail_cate = data.product.category_id;
      this.detail_price =  data.product.price;
      this.detail_description =  data.product.description;
       this.img = data.product.image;
       this.product_similar=data.product_similar;
      // console.log(this.detail_name);
      // this.product_detail = data;
   
    })
  }
  
  // onRadioChange(event:any){
  //   const selectedOption = event.target.value;
  //   localStorage.setItem('size', selectedOption);
  //   console.log("abcc",selectedOption)
  // }
  items:any = [];

  // addToCart(item:any) {
  
  //   if (!this.cartService.itemInCart(item)) {
  //     item.qtyTotal = 1;    
  //     this.cartService.addToCart(item); //add items in cart
  //     this.items = [...this.cartService.getItems()];
  //     alert('Đã thêm thành công 1 sản phẩm vào giỏ hàng!')
  //   }
  // }
  // getSelectedSize(): any {
  //   const selectedSize = this.size.find((item: any) => item.selected);
  //   return selectedSize ? selectedSize : null;
  // }
  // getSelectedSize(item: any): void {
  //   this.selectedSize = item;
  // }
  // getSelectedColor(item: any): void {
  //   this.selectedColor = item;
  // }
  // addToCart(item: any): void {
  //   item.quantity=1;
  //   this.cartService.addToCart(item);
  // }

// bản cũ
  // addToCart(): void {
  //   if (this.selectedSize) {
  //     const newItem = {
  //       product: { ...this.product_detail, size: [this.selectedSize], color: [this.selectedColor]},
  //       quantity: 1
  //     };
  //     this.cartService.addToCart(newItem);
  //   } else {
  //     // console.log('chọn size');
  //     alert('chưa chọn size or color')
  //   }
  // }
  
  addToCart(): void {
    // console.log('cart',this.product_detail);
    const newItem = {
      
      product: this.product_detail,
      quantity: 1,
      
    };
    this.cartService.addToCart(newItem);
    alert('Thêm sản phẩm thành công')
    
  }
  
  
  

  // addToCart(): void {
  //   const existingItem = this.cartService.getCartItemById(this.product_detail.id);
  //   if (existingItem) {
  //     existingItem.quantity += 1;
  //     console.log('hhhhh', existingItem);
  //     this.cartService.saveCartToLocalStorage();
  //   } else {
  //     const newItem = {
  //       product: JSON.parse(JSON.stringify(this.product_detail)),
  //       quantity: 1
  //     };
  //     this.cartService.addToCart(newItem);
  //   }
  // }
  
  
  
  // addToCart(product: any): void {
  //   const existingItem = this.cartService.getCartItemById(product.id);
  
  //   if (existingItem) {
  //     const newItem = { ...existingItem };
  //     newItem.quantity += 1;
  //     this.cartService.updateCartItem(newItem);
  //   } else {
  //     const newItem = { ...product, quantity: 1 };
  //     this.cartService.addToCart(newItem);
  //   }
  // }
  
  ngAfterViewInit() {
    
    this.loadScripts('assets/content.js');
  }
 
}

