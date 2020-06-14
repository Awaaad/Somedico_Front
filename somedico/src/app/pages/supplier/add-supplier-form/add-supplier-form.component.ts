import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  public errorMessages = {
    supplierName: [
      { type: 'required', message: '⚠ Supplier name is required' },
    ],
    email: [
      { type: 'pattern', message: '⚠ Invalid email address' },
    ],
    telephoneNumber: [
      { type: 'required', message: '⚠ Contact number is required'},
      { type: 'pattern', message: '⚠ Invalid contact number' }
    ]
  };

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

      supplierName: new FormControl('',
        Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl('',
        Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      telephoneNumber: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ),
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
      }
    );

    setTimeout(() => {
      this.emittersService.emitAddProductEventEmmiter.emit(true);
    }, 1000);

    this.addSupplierForm.reset();
    (this.addSupplierForm.get('suppliers') as FormArray).clear();
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Supplier(s) successfully added',
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

