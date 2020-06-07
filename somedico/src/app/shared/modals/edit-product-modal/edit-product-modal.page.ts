import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { SupplierDto } from '../../models/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.page.html',
  styleUrls: ['./edit-product-modal.page.scss'],
})
export class EditProductModalPage implements OnInit {

  public editProductForm: FormGroup;
  public productId: number;
  public productName: string;
  public description: string;
  public dosage: string;
  public category: string;
  public box: number;
  public unitsPerBox: number;
  public unitsTotal: number;
  public pricePerBox: number;
  public pricePerUnit: number;
  public requirePrescription: boolean;
  public supplier: SupplierDto;
  public supplierId: number;
  public supplierName: string;
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
    console.table(this.navParams);
    this.productId = this.navParams.data.productId;
    this.productName = this.navParams.data.productName;
    this.description = this.navParams.data.description;
    this.dosage = this.navParams.data.dosage;
    this.category = this.navParams.data.category;
    this.box = this.navParams.data.box;
    this.unitsPerBox = this.navParams.data.unitsPerBox;
    this.unitsTotal = this.navParams.data.unitsTotal;
    this.pricePerBox = this.navParams.data.pricePerBox;
    this.pricePerUnit = this.navParams.data.pricePerUnit;
    this.requirePrescription = this.navParams.data.requirePrescription;
    this.supplier = this.navParams.data.supplier;
    this.supplierId = this.supplier.supplierId;
    this.supplierName = this.supplier.supplierName;

    this.editProductForm = this.formBuilder.group({
      productId: new FormControl(this.productId),
      productName: new FormControl(this.productName),
      description: new FormControl(this.description),
      dosage: new FormControl(this.dosage),
      category: new FormControl(this.category),
      box: new FormControl(this.box),
      unitsPerBox: new FormControl(this.unitsPerBox),
      unitsTotal: new FormControl(this.unitsTotal),
      pricePerBox: new FormControl(this.pricePerBox),
      pricePerUnit: new FormControl(this.pricePerUnit),
      requirePrescription: new FormControl(this.requirePrescription),
      supplier: this.formBuilder.group({
        supplierId: new FormControl(this.supplierId),
        supplierName: new FormControl(this.supplierName),
      })
    });
  }

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Product succesfully edited',
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

  saveEditedProduct() {
    this.apiService.editProduct(this.editProductForm.value).subscribe(
      data => {
      },
      error => {
      }
    );
    setTimeout(() => {
      this.emittersService.emitEditProductEventEmmiter.emit(true);
    }, 1000);
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      this.unsuccessMsg();
    } else {
      this.saveEditedProduct();
      this.closeModal();
      this.successMsg();
    }
  }
}
