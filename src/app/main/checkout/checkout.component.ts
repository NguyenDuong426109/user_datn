import { Component, OnInit } from '@angular/core';
import { FormArray,FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { VietnamApiService } from 'src/app/service/vietnam.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // product:any;
  product_cart:any=[];
  items: any = [];
  total :any;
  total_payment :any;
  totalQuantity: number;
  quantity:number;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  result: string = "";

  constructor(
    public cartService: CartService,
    public userServire: UserService,
    private router: Router,
    private apiService: VietnamApiService


  ) { }
  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
    const quantities = this.items.map((item: any) => item.quantity);
    this.totalQuantity = quantities.reduce((total: number, quantity: number) => total + quantity, 0);
    console.log('dya', this.total_payment);
    this.items.forEach((item: any) => {
      const orderDetail = new FormGroup({
        product_id: new FormControl(item.product.product.id),
        price: new FormControl(item.product.product.price),
        quantity: new FormControl(item.quantity),
        img_oder: new FormControl(item.product.image[0].img_product)
      });
  
      (this.checkout_form.get('oder_detail') as FormArray).push(orderDetail);
    });
    console.log('chi tiết đơn', this.checkout_form);
    this.total_payment = this.total_money + 0;
    this.checkout_form.get('totalMoney').setValue(this.total_money + 0);
    this.apiService.getProvinces().subscribe((response: any) => {
      this.provinces = response;
    });
  }
  
  checkout_form: FormGroup = new FormGroup({
    // order_note: new FormControl(),
    // totalMoney: new FormControl(),
    // name: new FormControl(),
    // adress: new FormControl(),
    // email: new FormControl(),
    // phone: new FormControl(),
    // oder_detail: new FormArray([]),


    order_note: new FormControl(),
    totalMoney: new FormControl(),
    name: new FormControl(),
    adress: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    oder_detail: new FormArray([]),
    // note: new FormControl(),
  });

  // ngOnInit(): void {
  //   this.items = this.cartService.getCartItems();
  //   const quantities = this.items.map((item: any) => item.quantity);
  //   this.totalQuantity = quantities.reduce((total: number, quantity: number) => total + quantity, 0);
  //   console.log('dya',this.total_payment);
  //   this.items.forEach((item: any) => {
  //     const orderDetail = new FormGroup({
  //       product_id: new FormControl(item.product.product.id),
  //       price: new FormControl(item.product.product.price),
  //       quantity: new FormControl(item.quantity),
  //       img_oder: new FormControl(item.product.image[0].img_product)
  //     });
  
  //     (this.checkout_form.get('oder_detail') as FormArray).push(orderDetail);
  //   });
  //   this.total_payment = this.total_money + 30000;
  //   this.checkout_form.get('totalMoney').setValue(this.total_money + 30000);

  // }
  // checkout_form: FormGroup = new FormGroup({

  //   order_note: new FormControl(),
  //   totalMoney: new FormControl(),
  //   name: new FormControl(),
  //   adress: new FormControl(),
  //   email: new FormControl(),
  //   phone: new FormControl(),
  //   oder_detail: new FormArray([]),
  //   note: new FormControl(),

  //   // oder_detail: new FormControl(this.product),
  // });
 

   onSubmit(): void {
    console.log('checkout_form hh',this.checkout_form.value);
    this.userServire.check_out(this.checkout_form.value).subscribe(
      data => {
        localStorage.removeItem('cart');
        console.log('Order success', data);
        alert('Thanh toán thành công');
        this.router.navigate(['/']);
      },
      error => {
        console.log('Order error', error);
        alert('Thanh toán thất bại');
      }
    );
  }
  
  get product(){
    this.cartService.loadCart();
    // this.product_cart = this.cartService.getItems();
    return this.product_cart=this.cartService.getCartItems();
  }

  // get total_money(){
  //   return this.total = this.items.reduce(
  //     (sum: number, item: any) => (sum + item.quantity * item.product.product.price),
  //     0
  //   );
  // }
  get total_money() {
    return this.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.product.product.price,
      0
    );
  }
  getQuantity(item: any): number {
    return item.quantity;
  }
  // test:any;
  // get total_money2(){
  //   return this.test= this
  // }
  onProvinceChange() {
    const selectedProvinceCode = (document.getElementById('province') as HTMLSelectElement).value;
    this.apiService.getDistricts(selectedProvinceCode).subscribe((response: any) => {
      this.districts = response.districts;
      this.resetWards();
      this.printResult();
    });
  }

  onDistrictChange() {
    const selectedDistrictCode = (document.getElementById('district') as HTMLSelectElement).value;
    this.apiService.getWards(selectedDistrictCode).subscribe((response: any) => {
      this.wards = response.wards;
      this.printResult();
    });
  }

  onWardChange() {
    this.printResult();
  }

  resetWards() {
    this.wards = [];
    this.printResult();
  }

  printResult() {
    const selectedProvinceText = (document.getElementById('province') as HTMLSelectElement).options[(document.getElementById('province') as HTMLSelectElement).selectedIndex].text;
    const selectedDistrictText = (document.getElementById('district') as HTMLSelectElement).options[(document.getElementById('district') as HTMLSelectElement).selectedIndex].text;
    const selectedWardText = (document.getElementById('ward') as HTMLSelectElement).options[(document.getElementById('ward') as HTMLSelectElement).selectedIndex].text;
  
    if (selectedDistrictText && selectedProvinceText && selectedWardText) {
      this.result = selectedProvinceText + ", " + selectedDistrictText + ", " + selectedWardText;
      this.checkout_form.get('adress')?.setValue(this.result);
    } else {
      this.result = "";
      this.checkout_form.get('adress')?.setValue('');
    }
  }
  
}
