import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarningModalPage } from './warning-modal.page';

const routes: Routes = [
  {
    path: '',
    component: WarningModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarningModalPageRoutingModule {}
