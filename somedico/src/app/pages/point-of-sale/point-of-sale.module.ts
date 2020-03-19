import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointOfSalePageRoutingModule } from './point-of-sale-routing.module';

import { PointOfSalePage } from './point-of-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointOfSalePageRoutingModule
  ],
  declarations: [PointOfSalePage]
})
export class PointOfSalePageModule {}
