import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductPageRoutingModule } from './add-product-routing.module';

import { AddProductPage } from './add-product.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AddProductFormComponent } from '../products/add-product-form/add-product-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddProductPage,
    AddProductFormComponent
  ]
})
export class AddProductPageModule {}
