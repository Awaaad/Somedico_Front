import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { Subscription } from 'rxjs';
import { FilterProductListDto, ProductDto } from 'src/app/shared/models/models';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  products: ProductDto[] = [];
  showFilter = false;
  refreshProductList: boolean;
  noProductsFound = false;
  public page = 0;
  public totalPages = 0;
  public limit = 20;
  public sortOrder = 'ASC';
  public sortBy = 'productId';
  public productName = '';
  public supplierName = 'All';
  public requirePrescription = null;
  public category = 'All';
  public totalProducts: number;

  private submitAddProductFormSubscription: Subscription;
  constructor(
    private apiService: ApiService,
    private emittersService: EmittersService
  ) { }

  ngOnInit() {
    this.getAllProductsFromDB();
  }

  ngAfterViewInit(): void {
    this.submitAddProductFormSubscription = this.emittersService.emitAddProductEventEmmiter.subscribe(data => {
      this.refreshProductList = data;
      console.log('submit', this.refreshProductList);
      if (this.refreshProductList == true) {
        this.products = [];
        this.getAllProductsFromDB();
      }
    });
  }

  showOrHideFilter() {
    this.showFilter = !this.showFilter;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getAllProductsFromDB(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.products = [];
      this.totalProducts = 0;
    }
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

        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.getAllProductsFromDB(event, true);
    }, 500);
  }

  searchByProductName(productName: string) {
    this.productName = productName;
    this.getAllProductsFromDB();
  }


  filterBySupplierName(event) {
    this.supplierName = event.target.value;
    this.getAllProductsFromDB();
    // console.log();
  }

  filterByCategory(event) {
    this.category = event.target.value;
    this.getAllProductsFromDB();
    // console.log();
  }


  ngOnDestroy(): void {
    this.submitAddProductFormSubscription.unsubscribe();
  }

}
