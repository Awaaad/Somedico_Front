import { Component, OnInit } from '@angular/core';
import { SupplierDto } from '../../models/models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { EmittersService } from 'src/app/services/emitters.service';
import { SupplierApiService } from 'src/app/services/api/supplier-api/supplier.api.service';

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
  public errorMessages = {
    supplierName: [
      { type: 'required', message: '⚠ Supplier name is required' },
    ],
    email: [
      { type: 'pattern', message: '⚠ Invalid email address' },
    ],
    telephoneNumber: [
      { type: 'required', message: '⚠ Contact number is required' },
      { type: 'pattern', message: '⚠ Invalid contact number' }
    ]
  };

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private supplierApiService: SupplierApiService,
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
      supplierName: new FormControl(this.supplier.supplierName,
        Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl(this.supplier.email,
        Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      telephoneNumber: new FormControl(this.supplier.telephoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ),
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
    this.supplierApiService.editSupplier(this.editSupplierForm.value).subscribe(
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
