import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { SupplierDto } from '../../models/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { ProductApiService } from 'src/app/services/api/product-api/product.api.service';
import { SupplierApiService } from 'src/app/services/api/supplier-api/supplier.api.service';

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
  public suppliers: SupplierDto[];
  public supplierId: number;
  public supplierName: string;
  public submitted = false;
  public errorMessages = {
    productName: [
      { type: 'required', message: '⚠ Product name is required' },
    ],
    dosage: [
      { type: 'required', message: '⚠ Dosage is required' },
    ],
    box: [
      { type: 'required', message: '⚠ Box is required' },
    ],
    unitsPerBox: [
      { type: 'required', message: '⚠ Units per box is required' },
    ],
    pricePerBox: [
      { type: 'required', message: '⚠ Price per box is required' },
    ],
    pricePerUnit: [
      { type: 'required', message: '⚠ Price per unit is required' },
    ],
    requirePrescription: [
      { type: 'required', message: '⚠ Require Prescription is required' },
    ],
    supplier: [
      { type: 'required', message: '⚠ Supplier name is required' },
    ],
  };

  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private productApiService: ProductApiService,
    private supplierApiService: SupplierApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.supplierApiService.getAllSuppliers().subscribe((data => {
      this.suppliers = data;
    }));
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
      productName: new FormControl(this.productName,
        Validators.compose([
          Validators.required
        ])
      ),
      description: new FormControl(this.description),
      dosage: new FormControl(this.dosage,
        Validators.compose([
          Validators.required
        ])
      ),
      category: new FormControl(this.category),
      box: new FormControl(this.box,
        Validators.compose([
          Validators.required
        ])
      ),
      unitsPerBox: new FormControl(this.unitsPerBox,
        Validators.compose([
          Validators.required
        ])
      ),
      unitsTotal: new FormControl(this.unitsTotal),
      pricePerBox: new FormControl(this.pricePerBox,
        Validators.compose([
          Validators.required
        ])
      ),
      pricePerUnit: new FormControl(this.pricePerUnit,
        Validators.compose([
          Validators.required
        ])
      ),
      requirePrescription: new FormControl(JSON.stringify(this.requirePrescription),
        Validators.compose([
          Validators.required
        ])
      ),
      supplier: new FormControl(this.supplier,
        Validators.compose([
          Validators.required
        ])
      )
      // supplier: this.formBuilder.group({
      //   supplierId: new FormControl(this.supplierId),
      //   supplierName: new FormControl(this.supplierName),
      // })
    });
  }

  ionViewWillEnter() {

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
    this.productApiService.editProduct(this.editProductForm.value).subscribe(
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
