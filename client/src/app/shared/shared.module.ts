import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './components/pager/pager.component';
import { PaginHeaderComponent } from './components/pagin-header/pagin-header.component';


@NgModule({
    declarations: [
        PaginHeaderComponent,
        PagerComponent
    ],
    imports: [
        CommonModule,
        PaginationModule.forRoot(),
        CarouselModule.forRoot()
    ],
    exports: [
        PaginationModule,
        PaginHeaderComponent,
        PagerComponent,
        CarouselModule
    ]
})
export class SharedModule { }
