import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { OrderProductDto } from '../../models/models';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.page.html',
  styleUrls: ['./confirmation-modal.page.scss'],
})
export class ConfirmationModalPage implements OnInit {

  public confirmPurchaseForm: FormGroup;
  public orderProducts: OrderProductDto[] = [];
  public paid: string;

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.paid = 'true';
    this.orderProducts = this.navParams.data.orderProductDtos;
    this.orderProducts.forEach((product, index) => {
      if (this.orderProducts[index].unitsOrdered === null) {
        delete this.orderProducts[index].productDto;
      }
    });
    this.confirmPurchaseForm = this.formBuilder.group({
      cashierName: new FormControl(''),
      customerName: new FormControl(''),
      paid: new FormControl()
    });
    console.log(this.orderProducts);
  }

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    const order = {
      cashierName: this.confirmPurchaseForm.get('cashierName').value,
      customerName: this.confirmPurchaseForm.get('customerName').value,
      orderDate: new Date(),
      paid: this.confirmPurchaseForm.get('paid').value,
      orderProductDtos: this.orderProducts,
      totalPrice: this.navParams.data.totalPrice
    };
    this.apiService.saveOrder(order).subscribe(
      data => {
        this.modalController.dismiss();
      },
      error => {

      }
    );
    this.emittersService.resetPOS.emit(true);
    this.modalController.dismiss();
  }
}
