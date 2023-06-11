import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlideComponent } from './slide/slide.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SlideComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SlideComponent

  ],
})
export class SharedModule { }
