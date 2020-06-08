import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryPageRoutingModule } from './order-history-routing.module';

import { OrderHistoryPage } from './order-history.page';
import { DateFormatterPipe } from 'src/app/services/pipes/date-formatter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistoryPageRoutingModule
  ],
  declarations: [
    OrderHistoryPage,
    DateFormatterPipe
  ],
  exports: [
    DateFormatterPipe
  ]
})
export class OrderHistoryPageModule {}
