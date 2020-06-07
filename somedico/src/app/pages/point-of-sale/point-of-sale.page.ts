import { Component, OnInit, OnDestroy } from '@angular/core';
import { isNumber } from 'util';
import { ProductDto, FilterProductListDto, OrderProductDto } from 'src/app/shared/models/models';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ConfirmationModalPage } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.page.html',
  styleUrls: ['./point-of-sale.page.scss'],
})
export class PointOfSalePage implements OnInit, OnDestroy {

  public products: ProductDto[] = [];
  public productsInCart: ProductDto[] = [];
  public orderProducts: OrderProductDto[] = [];
  public array: any;
  public noProductsFound = false;
  public showProductList = false;
  public submitted = false;
  public sortOrder = 'ASC';
  public sortBy = 'productId';
  public productName = '';
  public supplierName = 'All';
  public requirePrescription = null;
  public category = 'All';
  public value = '0';
  public oldValue = '0';
  public totalProducts: number;
  public boxes: number;
  public units: number;
  public subTotal = 0;
  public paid = 0;
  public boxesOrderd = 0;
  public unitsOrdered = 0;
  public page = 0;
  public totalPages = 0;
  public limit = 100;
  public lastOperator = 'x';
  public readyForNewInput = true;
  public disableCompleteSaleButton = false;
  numberGroups = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];
  public refreshPOSSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private emittersService: EmittersService,
    private modalController: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit(): void {
    this.refreshPOSSubscription = this.emittersService.resetPOS.subscribe(
      (refresh: boolean) => {
        if (refresh) {
          this.newSale();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.refreshPOSSubscription.unsubscribe();
  }

  searchByProductName(productName: string) {
    this.productName = productName;
    this.getAllProductsFromDB();
  }

  getAllProductsFromDB() {
    if (this.productName === '') {
      this.showProductList = false;
      this.products = [];
    } else {
      this.showProductList = true;
      this.products = [];
      this.apiService.getAllProductThroughFilter(this.productName, this.supplierName, this.category, this.page, this.limit, this.sortOrder, this.sortBy).subscribe(
        (data = FilterProductListDto) => {
          this.products = [...this.products, ...data.products];

          this.totalPages = data.totalPages;
          this.totalProducts = this.totalProducts + data.totalElements;

          if (this.totalPages === 0) {
            this.noProductsFound = true;
          } else {
            this.noProductsFound = false;
          }
        }
      );
    }
  }

  public addProductToCart(productId: number): void {
    this.disableCompleteSaleButton = false;
    this.apiService.getProductById(productId).subscribe(
      (data = ProductDto) => {
        this.productsInCart.push(data);
        this.orderProducts.push({
          orderProductId: null,
          productDto: data,
          productName: null,
          boxesOrdered: null,
          unitsOrdered: null,
          totalPrice: null
        });
        this.productsInCart.forEach((product, index) => {
          if (this.productsInCart[index].boxesOrdered == null || this.productsInCart[index].unitsOrdered == null) {
            this.productsInCart[index].boxesOrdered = 0;
            this.productsInCart[index].unitsOrdered = 0;
          }
        });
      }
    );
  }


  public removeProductInCart(index: number): void {
    for (let i = 0; i < this.productsInCart.length; i++) {
      if (i === index) {
        // console.log(this.productsInCart[i].productId);
        this.productsInCart.splice(i, 1);
        // console.log('removedProuct', this.productsInCart);
      }
    }
    this.calculateSubTotal();
  }

  calculateSubTotal() {
    this.subTotal = 0;
    this.productsInCart.forEach((product, index) => {
      this.productsInCart[index].total = ((this.productsInCart[index].boxesOrdered * this.productsInCart[index].pricePerBox) + (this.productsInCart[index].unitsOrdered * this.productsInCart[index].pricePerUnit));
      this.subTotal = this.subTotal + this.productsInCart[index].total;
    });
  }

  completeSale() {
    this.productsInCart.forEach((product, index) => {
      this.orderProducts[index].productName = this.productsInCart[index].productName;
      this.orderProducts[index].boxesOrdered = this.productsInCart[index].boxesOrdered;
      this.orderProducts[index].unitsOrdered = (this.productsInCart[index].boxesOrdered * this.productsInCart[index].unitsPerBox ) + this.productsInCart[index].unitsOrdered;
      this.orderProducts[index].totalPrice = this.productsInCart[index].total;
      if (this.orderProducts[index].unitsOrdered === 0) {
        this.removeProductInCart(index);
      }
    });
    console.log(this.productsInCart);
    if (this.productsInCart.length === 0) {
      this.disableCompleteSaleButton = true;
    } else {
      this.openConfirmationModal();
    }
  }

  openConfirmationModal() {
    this.productsInCart.forEach((product, index) => {
      this.orderProducts[index].productName = this.productsInCart[index].productName;
      this.orderProducts[index].boxesOrdered = this.productsInCart[index].boxesOrdered;
      this.orderProducts[index].unitsOrdered = (this.productsInCart[index].boxesOrdered * this.productsInCart[index].unitsPerBox ) + this.productsInCart[index].unitsOrdered;
      this.orderProducts[index].totalPrice = this.productsInCart[index].total;
      if (this.orderProducts[index].unitsOrdered === 0) {
        this.removeProductInCart(index);
      }
    });
    if (this.productsInCart.length > 0) {
      this.modalController.create({
        component: ConfirmationModalPage,
        cssClass: 'confirmation-modal-container',
        componentProps: {
          orderProductDtos: this.orderProducts,
          totalPrice: this.subTotal
        },
        backdropDismiss: false
      }).then((modalElement) => {
        modalElement.present();
      });
    }
  }

  newSale() {
    this.products = [];
    this.productName = '';
    this.showProductList = false;
    this.productsInCart = [];
  }

  // successful message
  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Sale has been completed successfully',
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
      message: 'Something went wrong with the transaction',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  // calculator
  onButtonPress(symbol) {

    if (isNumber(symbol)) {
      if (this.readyForNewInput) {
        this.value = '' + symbol;
      } else {
        this.value += '' + symbol;
      }
      this.readyForNewInput = false;
    } else if (symbol === 'c') {
      this.value = '0';
      this.readyForNewInput = true;
    } else if (symbol === '=') {
      if (this.lastOperator === 'x') {
        // tslint:disable-next-line: radix
        this.value = '' + (parseInt(this.oldValue) * parseInt(this.value));
      } else if (this.lastOperator === '-') {
        // tslint:disable-next-line: radix
        this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
      } else if (this.lastOperator === '+') {
        // tslint:disable-next-line: radix
        this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
      } else if (this.lastOperator === '/') {
        // tslint:disable-next-line: radix
        this.value = '' + (parseInt(this.oldValue) / parseInt(this.value));
      }
      this.readyForNewInput = true;
    } else { // operator
      this.readyForNewInput = true;
      this.oldValue = this.value;
      this.lastOperator = symbol;
    }
  }
}
