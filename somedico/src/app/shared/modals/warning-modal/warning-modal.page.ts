import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OrderApiService } from 'src/app/services/api/order-api/order.api.service';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { OrderDto } from '../../models/models';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.page.html',
  styleUrls: ['./warning-modal.page.scss'],
})
export class WarningModalPage implements OnInit {

  order: OrderDto;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private orderApiService: OrderApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.order = this.navParams.data.order;
  }

  // close modal
  closeModal() {
    this.modalController.dismiss(false);
  }

  onSubmit() {
    this.orderApiService.editOrderPayment(this.order).subscribe(
      data => {
      },
      error => {
      }
    );
    setTimeout(() => {
      this.emittersService.resetOrderList.emit(true);
    }, 1000);
    this.modalController.dismiss(true);
  }

}
