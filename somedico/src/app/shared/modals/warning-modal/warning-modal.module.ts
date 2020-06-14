import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarningModalPageRoutingModule } from './warning-modal-routing.module';

import { WarningModalPage } from './warning-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarningModalPageRoutingModule
  ],
  declarations: [WarningModalPage]
})
export class WarningModalPageModule {}
