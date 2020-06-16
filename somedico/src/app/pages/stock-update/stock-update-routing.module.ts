import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockUpdatePage } from './stock-update.page';

const routes: Routes = [
  {
    path: '',
    component: StockUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockUpdatePageRoutingModule {}
