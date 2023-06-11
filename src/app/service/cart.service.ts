import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // products:any[]=[];
  // items:any = [];
  // constructor() { }
  // addToCart(addedItem:any) {
  //   // console.log('non',this.items)
  //   this.items.push(addedItem);
  //   this.saveCart();
  // }
 
  // getItems() {
  //   return this.items;
  // }
  // saveCart(): void {
  //   localStorage.setItem('cart_items', JSON.stringify(this.items));
  // }
  // itemInCart(item:any): boolean {
  //   return this.items.findIndex((o:any) => o.id === item.id) > -1;
  // }
  // clearCart(items:any) {
  //   this.items = [];

  //   localStorage.removeItem('cart_items');
  // }
  removeItem(item:any) {
    const index = this.cartItems.findIndex((o:any) => o.id === item.id);

    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }

  // cartItems: any[] = [];
  // cartItems: { product: any, quantity: number }[] = [];
  cartItems: { product: any, quantity: number}[] = [];


  constructor() {
    const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);
    if (Array.isArray(parsedCart)) {
      this.cartItems = parsedCart;
    }
  } else {
    this.cartItems = [];
  }
  console.log('Đã lưu',this.cartItems);
  }
  loadCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  // addToCart(item: { product: any, quantity: number }): void {
  //   this.cartItems.push(item);
  //   this.saveCartToLocalStorage();
  // }
  // addToCart(item: { product: any, quantity: number }): void {
  //   const existingItemIndex = this.cartItems.findIndex(
  //     cartItem => cartItem.product.id === item.product.id
  //   );
  //   if (existingItemIndex !== -1) {
  //     this.cartItems[existingItemIndex].quantity += item.quantity;
  //     this.cartItems[existingItemIndex].product.size = item.product.size;
  //     this.cartItems[existingItemIndex].product.color = item.product.color;

  //   } else {
  //     const newItem = {
  //       product: { ...item.product },
  //       quantity: item.quantity
  //     };
  //     this.cartItems.push(newItem);
  //   }
  
  //   this.saveCartToLocalStorage();
  // }
  // addToCart(item: { product: any, quantity: number }): void {
  //   const existingItem = this.getCartItemById(item.product.id);
  
  //   console.log('tồn tại',this.getCartItemById(item.product.id));
  //   if (existingItem) {
  //     existingItem.quantity += item.quantity;
  //   } else {
  //     item.product.quantity = item.quantity; // Đặt số lượng cho sản phẩm
  //     this.cartItems.push(item.product);
  //   }
  
  //   this.saveCartToLocalStorage();
  // }cartItems: { product: any, quantity: number, size: any, color: any }[] = [];

  
  addToCart(item: { product: any, quantity: number }): void {
    const existingItem = this.getCartItemById(item.product.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
  
    this.saveCartToLocalStorage();
  }
  
  
  // getCartItemById(id: number): any {
  //   console.log(this.cartItems.find(item => item.product.id === id));
  //   return this.cartItems.find(item => item.product.id === id);
  // }
  getCartItemById(id: number): any {
    
    return this.cartItems.find(item => item.product.product.id === id);
  }
  
  
  // tăng số lượng 
  // getCartItemById(id: number): any {
  //   console.log('so1', this.cartItems.find(item => item.product.id === id));
  //   return this.cartItems.find(item => item.product === id);
  // }

  getCartItems() {
    return this.cartItems;
   
  }
 
     



  clearCart(): void {
    this.cartItems = [];
    this.saveCartToLocalStorage();
  }
 
  public saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    console.log('lưu ở đây',this.cartItems);
  }
  
}

