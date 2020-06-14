import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';
import { ModalController, IonInfiniteScroll, ToastController } from '@ionic/angular';
import { OrderDto, FilterOrderListDto } from 'src/app/shared/models/models';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Router } from '@angular/router';
import { WarningModalPage } from 'src/app/shared/modals/warning-modal/warning-modal.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public showFilter = false;
  public noOrderHistoryFound = false;
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

  public refreshOrderListSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private emittersService: EmittersService,
    private modalController: ModalController,
    private utilsService: UtilsService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.refreshOrderListSubscription = this.emittersService.resetOrderList.subscribe((refresh => {
      if (refresh === true) {
        this.successMsg();
        this.getAllOrdersFromDB();
      }
    }));
    this.getAllOrdersFromDB();
  }

  ngOnDestroy(): void {
    this.refreshOrderListSubscription.unsubscribe();
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

        if (this.totalPages === 0) {
          this.noOrderHistoryFound = true;
        } else {
          this.noOrderHistoryFound = false;
        }

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

  routeTo(orderId: number) {
    this.router.navigate(['/order-details', orderId]);
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Payment successfully made',
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
      message: 'Ooops something went wrong',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  makePayment(order: OrderDto) {
    order.paid = true;
    this.modalController.create({
      component: WarningModalPage,
      cssClass: 'warning-modal-container',
      componentProps: {
        order
      },
      backdropDismiss: false
    }).then((modalElement) => {
      modalElement.present();
    });
  }
}
