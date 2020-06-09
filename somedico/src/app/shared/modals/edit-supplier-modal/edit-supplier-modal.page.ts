import { Component, OnInit } from '@angular/core';
import { SupplierDto } from '../../models/models';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';

@Component({
  selector: 'app-edit-supplier-modal',
  templateUrl: './edit-supplier-modal.page.html',
  styleUrls: ['./edit-supplier-modal.page.scss'],
})
export class EditSupplierModalPage implements OnInit {

  public editSupplierForm: FormGroup;
  public supplier: SupplierDto;
  public supplierName: string;
  public email: string;
  public telephoneNumber: number;
  public address: string;
  public submitted = false;

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.supplier = this.navParams.data.supplier;
    this.supplierName = this.supplier.supplierName;
    this.email = this.supplier.email;
    this.telephoneNumber = this.supplier.telephoneNumber;
    this.address = this.supplier.address;

    this.editSupplierForm = this.formBuilder.group({
      supplierId: new FormControl(this.supplier.supplierId),
      supplierName: new FormControl(this.supplier.supplierName),
      email: new FormControl(this.supplier.email),
      telephoneNumber: new FormControl(this.supplier.telephoneNumber),
      address: new FormControl(this.supplier.address)
    });
  }

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }
  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Supplier succesfully edited',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  // unsuccessful message
  async unsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Please fill in all the required fields',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  saveEditedSupplier() {
    this.apiService.editSupplier(this.editSupplierForm.value).subscribe(
      data => {
      },
      error => {
      }
    );
    setTimeout(() => {
      this.emittersService.emitEditSupplierEventEmmiter.emit(true);
    }, 1000);
  }

  onSubmit() {
    this.submitted = true;
    if (this.editSupplierForm.invalid) {
      this.unsuccessMsg();
    } else {
      this.saveEditedSupplier();
      this.closeModal();
      this.successMsg();
    }
  }
}
