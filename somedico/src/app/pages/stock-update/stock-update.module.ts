import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockUpdatePageRoutingModule } from './stock-update-routing.module';

import { StockUpdatePage } from './stock-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockUpdatePageRoutingModule
  ],
  declarations: [StockUpdatePage]
})
export class StockUpdatePageModule {}
