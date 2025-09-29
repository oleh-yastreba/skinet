import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
        PaginationModule.forRoot()
    ],
    exports: [
        PaginationModule,
        PaginHeaderComponent,
        PagerComponent
    ]
})
export class SharedModule { }
