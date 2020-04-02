import { Component, OnInit } from '@angular/core';
import { isNumber } from 'util';
import { ProductDto, FilterProductListDto } from 'src/app/shared/models/models';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.page.html',
  styleUrls: ['./point-of-sale.page.scss'],
})
export class PointOfSalePage implements OnInit {

  products: ProductDto[] = [];
  productsInCart: ProductDto[] = [];
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
  }

  getAllProductsFromDB() {
    if (this.productName == '') {
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

  addProductToCart(productId: number): void {
    console.log('productId', productId);
    this.apiService.getProductById(productId).subscribe(
      (data = ProductDto) => {
        this.productsInCart.push(data);
        // let x: ProductDto[] = [];
        // x.push(this.productsInCart);
        // localStorage.setItem('products', JSON.stringify(x));
      }
    );
    // this.array = this.array.push(this.productsInCart);
  }

  // calculator
  onButtonPress(symbol) {
    console.log(symbol);

    if (isNumber(symbol)) {
      console.log('is a number');
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
