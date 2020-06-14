import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ToastController } from '@ionic/angular';
import { SupplierDto } from 'src/app/shared/models/models';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
  public addProductForm: FormGroup;
  public submitted = false;
  public suppliers: SupplierDto[];
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
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private emittersService: EmittersService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.addProductFormGroup()
      ])
    });

    this.apiService.getAllSuppliers().subscribe((data => {
      this.suppliers = data;
    }));
  }

  addProductFormGroup() {
    return this.formBuilder.group({
      productName: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      description: new FormControl(''),
      dosage: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      category: new FormControl(''),
      box: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      unitsPerBox: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      unitsTotal: new FormControl(''),
      pricePerBox: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      pricePerUnit: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      requirePrescription: new FormControl('false',
        Validators.compose([
          Validators.required
        ])
      ),
      supplier: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      )
      // supplier: this.formBuilder.group({
      //   supplier: new FormControl('')
      // })
    });
  }

  addProduct(): void {
    (this.addProductForm.get('products') as FormArray).push(this.addProductFormGroup());
  }

  removeProduct(productGroupIndex: number): void {
    (this.addProductForm.get('products') as FormArray).removeAt(productGroupIndex);
  }

  get productsFields() {
    return this.addProductForm ? this.addProductForm.get('products') as FormArray : null;
  }

  save() {
    const products = {
      productDtos: this.addProductForm.controls.products.value
    };
    this.addProductForm.controls.products.value.forEach(product => {
      product.unitsTotal = product.unitsPerBox * product.box;
    });
    console.log(this.addProductForm.controls.products.value);
    this.apiService.saveAllProducts(products).subscribe(
      data => {
      },
      error => {
      },
    );

    setTimeout(() => {
      this.emittersService.emitAddProductEventEmmiter.emit(true);
    }, 1000);

    this.addProductForm.reset();
    (this.addProductForm.get('products') as FormArray).clear();
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Product(s) successfully added',
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

  onSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      this.unsuccessMsg();
    } else {
      this.save();
      this.successMsg();
    }
  }
}
