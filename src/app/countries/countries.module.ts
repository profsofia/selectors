import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { CountriesRoutingModule } from './countries-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CountriesModule { }
