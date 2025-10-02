import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "src/app/app-routing.module";
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
    declarations: [NavBarComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        RouterModule
    ],
    exports: [NavBarComponent]
})
export class CoreModule { }
