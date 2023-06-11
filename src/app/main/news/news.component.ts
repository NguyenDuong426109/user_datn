
import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-index',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends BaseComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector ,private user: UserService,private _router: ActivatedRoute, ) {
    super(injector);
  }
  new:any
  searchText: any;
  // list_new:any;
      //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [5, 10, 15, 20];
  ngOnInit(): void {
    this.getall_new(); 
  }
  getall_new(){
    this.user.get_all_new().subscribe((data:any)=>{
      console.log(data.news);
      // console.log(data.category);
      // this.categories_section_begin=data.new;
      this.new=data.news;
      // this.show_by_cate_new=data.show_by_cate_new;
      // this.all_new=data.all_new;
    },error =>{
      console.log(error);
    }
    )
  }
  ontableDataChange(event: any) {
    this.page = event;
    this.getall_new();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getall_new();
  }
  ngAfterViewInit() {
    this.loadScripts('assets/content.js');
  }
}
