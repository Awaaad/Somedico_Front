import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
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
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.order = this.navParams.data.order;
    console.log('order', this.order);
  }

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.apiService.editOrderPayment(this.order).subscribe(
      data => {
      },
      error => {
      }
    );
    setTimeout(() => {
      this.emittersService.resetOrderList.emit(true);
    }, 1000);
    this.modalController.dismiss();
  }

}
