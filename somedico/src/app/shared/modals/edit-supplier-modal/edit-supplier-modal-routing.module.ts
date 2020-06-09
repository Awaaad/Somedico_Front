import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSupplierModalPage } from './edit-supplier-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditSupplierModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSupplierModalPageRoutingModule {}
