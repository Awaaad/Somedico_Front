import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-supplier-form',
  templateUrl: './add-supplier-form.component.html',
  styleUrls: ['./add-supplier-form.component.scss'],
})
export class AddSupplierFormComponent implements OnInit {
  public addSupplierForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private emittersService: EmittersService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.addSupplierForm = this.formBuilder.group({
      suppliers: this.formBuilder.array([
        this.addSupplierFormGroup()
      ])
    });
  }

  addSupplierFormGroup() {
    return this.formBuilder.group({
      supplierName: new FormControl(''),
      email: new FormControl(''),
      telephoneNumber: new FormControl(''),
      address: new FormControl(''),
    });
  }

  addSupplier(): void {
    (this.addSupplierForm.get('suppliers') as FormArray).push(this.addSupplierFormGroup());
  }

  removeSupplier(supplierGroupIndex: number): void {
    (this.addSupplierForm.get('suppliers') as FormArray).removeAt(supplierGroupIndex);
  }

  get suppliersFields() {
    return this.addSupplierForm ? this.addSupplierForm.get('suppliers') as FormArray : null;
  }

  save() {
    const suppliers = {
      supplierDtos: this.addSupplierForm.controls.suppliers.value
    };
    console.log(this.addSupplierForm.controls.suppliers.value);
    this.apiService.saveAllSuppliers(suppliers).subscribe(
      data => {
      },
      error => {
        this.unsuccessMsg();
      }
    );

    setTimeout(() => {
      this.emittersService.emitAddProductEventEmmiter.emit(true);
    }, 1000);

    this.addSupplierForm.reset();
    (this.addSupplierForm.get('suppliers') as FormArray).clear();
    // console.log(this.addSupplierForm.get('suppliers') as FormArray);
    // console.log(this.addSupplierForm.get('suppliers') as FormArray);
    // console.log(this.addSupplierForm.controls.suppliers.value);
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
    if (this.addSupplierForm.invalid) {
      this.unsuccessMsg();
    } else {
      this.save();
      this.successMsg();
    }
  }
}

