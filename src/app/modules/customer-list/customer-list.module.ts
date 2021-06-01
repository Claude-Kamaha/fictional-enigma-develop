import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatTableDataSource } from '@angular/material/table';
import { CustomerListRoutes } from './customer-list.routing';
import { RouterModule } from '@angular/router';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(CustomerListRoutes),
    CommonModule,
   // BrowserAnimationsModule,
    //BrowserModule
  ]
})
export class CustomerListModule { }
