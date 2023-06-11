import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  product:any
  searchText: any;
  // list_product:any;
      //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private user: UserService,private _router: ActivatedRoute, ) { }
  ngOnInit() {
    this.getall_prduct(); 
    // this.get_product();
  }
  getall_prduct(){
    this.user.get_all_product().subscribe((data:any)=>{
      console.log(data);
      console.log(data.category);
      // this.categories_section_begin=data.product;
      this.product=data.product;
      // this.show_by_cate_product=data.show_by_cate_product;
      // this.all_product=data.all_product;
    },error =>{
      console.log(error);
    }
    )
  }
  ontableDataChange(event: any) {
    this.page = event;
    this.getall_prduct();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getall_prduct();
  }

  
}
