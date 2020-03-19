import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointOfSalePage } from './point-of-sale.page';

const routes: Routes = [
  {
    path: '',
    component: PointOfSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointOfSalePageRoutingModule {}
