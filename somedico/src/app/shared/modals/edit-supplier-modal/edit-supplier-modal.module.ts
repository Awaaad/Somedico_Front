import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSupplierModalPageRoutingModule } from './edit-supplier-modal-routing.module';

import { EditSupplierModalPage } from './edit-supplier-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSupplierModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditSupplierModalPage]
})
export class EditSupplierModalPageModule {}
