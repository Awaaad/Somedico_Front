import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationModalPage } from './confirmation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationModalPageRoutingModule {}
