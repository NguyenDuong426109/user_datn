import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NewsComponent } from './news/news.component';
import { IntroComponent } from './intro/intro.component';
import { NewDetailComponent } from './new-detail/new-detail.component';



const MainRoutes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'category/:id', component: CategoryComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'intro', component: IntroComponent
  },
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'detail-news/:id', component: NewDetailComponent
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    DetailComponent,
    CategoryComponent,
    CartComponent,
    CheckoutComponent,
    NewsComponent,
    IntroComponent,
    NewDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainRoutes),
    HttpClientModule,
  
  ]
})
export class MainModule { }
