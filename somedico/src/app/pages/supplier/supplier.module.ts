import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupplierPageRoutingModule } from './supplier-routing.module';
import { SupplierPage } from './supplier.page';
import { AddSupplierFormComponent } from './add-supplier-form/add-supplier-form.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    SupplierPage,
    AddSupplierFormComponent
  ]
})
export class SupplierPageModule {}
