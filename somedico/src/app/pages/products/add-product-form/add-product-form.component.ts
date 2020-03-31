import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.addProductFormGroup()
      ])
    });
  }

  addProductFormGroup() {
    return this.formBuilder.group({
      productName: new FormControl(''),
      description: new FormControl(''),
      dosage: new FormControl(''),
      category: new FormControl(''),
      box: new FormControl(''),
      unitsPerBox: new FormControl(''),
      unitsTotal: new FormControl(''),
      pricePerBox: new FormControl(''),
      pricePerUnit: new FormControl(''),
      requirePrescription: new FormControl(''),
      // supplier: new FormControl('')
      supplier: this.formBuilder.group({
        supplierId: new FormControl(''),
        supplierName: new FormControl(''),
      })
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
      products: this.addProductForm.controls.products.value
    }
    console.log(this.addProductForm.controls.products.value);
    this.apiService.saveAllProducts(products).subscribe(
      data => {
      },
      error => {
      }
    );

    setTimeout(() => {
      this.emittersService.emitAddProductEventEmmiter.emit(true);
    }, 1000);

    this.addProductForm.reset();
    (this.addProductForm.get('products') as FormArray).clear();
    // console.log(this.addProductForm.get('products') as FormArray);
    // console.log(this.addProductForm.get('products') as FormArray);
    // console.log(this.addProductForm.controls.products.value);
  }
}
