import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { OrderDto, FilterOrderListDto } from 'src/app/shared/models/models';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public showFilter = false;
  public orders: OrderDto[] = [];
  public page = 0;
  public totalPages = 0;
  public limit = 15;
  public sortOrder = 'DESC';
  public sortBy = 'orderDate';
  public totalOrders: number;
  public customerName = '';
  public cashierName = 'All';
  public date: string;

  constructor(
    private apiService: ApiService,
    private emittersService: EmittersService,
    private modalController: ModalController,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.getAllOrdersFromDB();
  }

  searchByCustomerName(customerName: string) {
    this.customerName = customerName;
    this.getAllOrdersFromDB();
  }

  showOrHideFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getAllOrdersFromDB(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.orders = [];
      this.totalOrders = 0;
    }
    this.apiService.getAllOrdersThroughFilter(this.customerName, this.cashierName, this.page, this.limit, this.sortOrder, this.sortBy).subscribe(
      (data = FilterOrderListDto) => {
        this.orders = [...this.orders, ...data.orderDtos];
        this.totalPages = data.totalPages;
        this.totalOrders = this.totalOrders + data.totalElements;

        // if (this.totalPages === 0) {
        //   this.noProductsFound = true;
        // } else {
        //   this.noProductsFound = false;
        // }

        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.getAllOrdersFromDB(event, true);
    }, 500);
  }

  filterByCategory() {

  }

  filterBySupplierName() {

  }

}
