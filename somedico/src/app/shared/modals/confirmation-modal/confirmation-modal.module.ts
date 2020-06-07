import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationModalPageRoutingModule } from './confirmation-modal-routing.module';

import { ConfirmationModalPage } from './confirmation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfirmationModalPage]
})
export class ConfirmationModalPageModule {}
