
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector ,private user: UserService,private _router: ActivatedRoute, ) {
    super(injector);
  }
  product:any
  searchText: any;
  new_first: any;
  new_down: any;
  // list_product:any;
      //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [5, 10, 15, 20];
  ngOnInit(): void {
    this.getall_prduct(); 
    this.getnewHome();
  }
  getall_prduct(){
    this.user.get_all_product().subscribe((data:any)=>{
      console.log(data);
      console.log(data.category);
      // this.categories_section_begin=data.product;
      this.product=data.product;
    },error =>{
      console.log(error);
    }
    )
  }
  getnewHome(){
    this.user.get_new_home().subscribe((data:any)=>{
      console.log(data);
      console.log(data.new_down);
      // this.categories_section_begin=data.product;
      this.new_first=data.new_first;
      this.new_down=data.new_down;
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
  ngAfterViewInit() {
    this.loadScripts('assets/content.js');
  }
}
