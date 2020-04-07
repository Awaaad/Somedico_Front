import { Component, OnInit } from '@angular/core';
import { isNumber } from 'util';
import { ProductDto, FilterProductListDto } from 'src/app/shared/models/models';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ModalController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.page.html',
  styleUrls: ['./point-of-sale.page.scss'],
})
export class PointOfSalePage implements OnInit {

  products: ProductDto[] = [];
  productsInCart: ProductDto[] = [];
  completeProductSale: ProductDto[] = [];
  array: any;
  noProductsFound = false;
  showProductList = false;
  public page = 0;
  public totalPages = 0;
  public limit = 100;
  public sortOrder = 'ASC';
  public sortBy = 'productId';
  public productName = '';
  public supplierName = 'All';
  public requirePrescription = null;
  public category = 'All';
  public totalProducts: number;
  value = '0';
  oldValue = '0';

  public boxes: number;
  public units: number;
  public subTotal = 0;
  public paid = 0;

  boxesOrderd = 0;
  unitsOrdered = 0;

  lastOperator = 'x';
  readyForNewInput = true;
  numberGroups = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];

  constructor(
    private apiService: ApiService,
    private emittersService: EmittersService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  searchByProductName(productName: string) {
    this.productName = productName;
    this.getAllProductsFromDB();
    this.completeSale();
  }

  getAllProductsFromDB() {
    if (this.productName === '') {
      this.showProductList = false;
      this.products = [];
    } else {
      this.showProductList = true;
      this.products = [];
      // tslint:disable-next-line: max-line-length
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
    this.apiService.getProductById(productId).subscribe(
      (data = ProductDto) => {
        this.productsInCart.push(data);

        this.productsInCart.forEach((element, index) => {
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
        console.log(this.productsInCart[i].productId);
        this.productsInCart.splice(i, 1);
        console.log('removedProuct', this.productsInCart);
      }
    }
    this.calculateSubTotal();
  }

  calculateSubTotal() {
    this.subTotal = 0;
    this.productsInCart.forEach((element, index) => {
      // tslint:disable-next-line: max-line-length
      this.productsInCart[index].total = ((this.productsInCart[index].boxesOrdered * this.productsInCart[index].pricePerBox) + (this.productsInCart[index].unitsOrdered * this.productsInCart[index].pricePerUnit));
      this.subTotal = this.subTotal + this.productsInCart[index].total;
    });
  }

  completeSale() {
    this.productsInCart.forEach((element, index) => {
      this.productsInCart[index].box = (this.productsInCart[index].box - this.productsInCart[index].boxesOrdered);
      this.productsInCart[index].unitsTotal = (this.productsInCart[index].unitsTotal - this.productsInCart[index].unitsOrdered);
    });

    const order = {
      cashierName: 'Awad',
      customerName: 'Awad',
      orderDate: new Date(),
      productName: 'Test',
      quantityOrderedBox: 1,
      quantityOrderedUnit: 1,
      products: this.productsInCart,
      totalPrice: 1
    };

    console.log(order);

    // this.apiService.saveOrder(order).subscribe(
    //   data => {
    //   },
    //   error => {
    //   }
    // );
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
