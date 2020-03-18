import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
      dosage: new FormControl(''),
      category: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      status: new FormControl('')
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
}
