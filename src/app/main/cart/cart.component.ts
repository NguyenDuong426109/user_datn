import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  
  // @ViewChildren('subTotalWrap_existing')
  products:any[]=[];
  total: number;
  items: { product: any; quantity: number;}[] = [];
  // subtotal :any;
  constructor(    public cartService: CartService,
   // private builder: FormBuilder
    ) { } 

  ngOnInit(): void {
    
    // this.get_product();
    this.cartService.loadCart();
    this.items = this.cartService.getCartItems();
    console.log('abvv', this.items )
    this.calculateTotal()
    // this.subtotal();
    // console.log('')
    // console.log('itemsss',this.items);
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

    return item.quantity*item.product.product.price;
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
