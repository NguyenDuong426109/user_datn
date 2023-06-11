import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category_name:any;
  id: number = 0;
  product_detail: any=[];
  subTotal:any;

  product_all:any;

  detail_name: any;
  detail_cate: any;
  detail_default_price: any;
  detail_price: any;
  detail_img_src: any;
  detail_description: any;
  product:any;
  size:any;
  color:any;
  img :any;

  $:any
  constructor( private user: UserService,private _router: ActivatedRoute, ) {
    
  }

  ngOnInit(): void {
    this.get_detail();
}
  get_detail() {
    this.id = this._router.snapshot.params['id'];
   this.user.get_category_product(this.id).subscribe((data: any) => {
      this.product=data.product;
     

      // console.log(this.detail_name);
      // this.product_detail = data;
    console.log("abc" , this.product,)
    })
  }
}
