import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  category:any;
  products:any[]=[];
  total: number;
  items: { product: any; quantity: number}[] = [];
  constructor(private user: UserService,private _router: ActivatedRoute,  public cartService: CartService,) { }

  ngOnInit( ) {
    this.getall_category();
    this.cartService.loadCart();
    this.items = this.cartService.getCartItems();
    console.log('abvv', this.items )
    this.calculateTotal()
  }
getall_category(){
    this.user.get_all_category().subscribe((data:any)=>{
      console.log(data);
      console.log(data.category);
      // this.categories_section_begin=data.product;
      this.category=data.category;
      // this.show_by_cate_product=data.show_by_cate_product;
      // this.all_product=data.all_product;
    },error =>{
      console.log(error);
    }
    )
  }
  changeSubtotal(idx :number, ev :any) {
    // let newquanlity = ev.target.value;
    // newquanlity=newquanlity>0?newquanlity:1;
    // ev.target.value=newquanlity
    this.items[idx].quantity=ev.target.value
    console.log('ev',ev.target.value);
    this.cartService.saveCartToLocalStorage();

  }
  
  increaseQuantity(item: { product: any, quantity: number }): void {
    item.quantity++;
    this.cartService.saveCartToLocalStorage();
    this.calculateTotal();
  }
  
  decreaseQuantity(item: { product: any, quantity: number }): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCartToLocalStorage();
      this.calculateTotal();
    }
  }
  
  calculateTotal(): void {
    this.total = this.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.product.product.price,
      0
    );
  }

  
  subtotal(item:any){

    return item.qtyTotal*item.price;
  }
  
  //----- remove specific item
  removeFromCart(item:any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getCartItems();
    this.calculateTotal();
  }

  // //----- clear cart item
  clearCart() {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart();
    this.items = [...this.cartService.getCartItems()];
  }

    //----- calculate total
 
    // tổng tien
    get sumtotal(){
      // console.log('total',this.total+25000)
      return this.items.reduce(
        (sum:any, x:any) => ({
          qtyTotal: 1,
          price: this.total+25000,
        }),
        { qtyTotal: 1, price: 0 }
      ).price;
    }
}
