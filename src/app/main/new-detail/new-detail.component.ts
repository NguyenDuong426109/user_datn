import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})
export class NewDetailComponent implements OnInit {
  new:any;
  id:number;
  constructor(injector: Injector, private user: UserService, private _router: ActivatedRoute ) { }

  ngOnInit() {
    this.get_detail();
  }
  get_detail() {
    this.id = this._router.snapshot.params['id'];

   this.user.get_new(this.id).subscribe((data: any) => {

      console.log('nef',data);
      this.new = data.new;
    
      // console.log(this.detail_name);
      // this.product_detail = data;
   
    })
  }
}
