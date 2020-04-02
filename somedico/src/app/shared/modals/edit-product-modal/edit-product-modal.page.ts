import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.page.html',
  styleUrls: ['./edit-product-modal.page.scss'],
})
export class EditProductModalPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }
}
