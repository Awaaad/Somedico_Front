import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SupplierDto, FilterSupplierListDto } from 'src/app/shared/models/models';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { Router } from '@angular/router';
import { EditSupplierModalPage } from 'src/app/shared/modals/edit-supplier-modal/edit-supplier-modal.page';
import { Subscription } from 'rxjs';
import { SupplierApiService } from 'src/app/services/api/supplier-api/supplier.api.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public showFilter = false;
  public suppliers: SupplierDto[] = [];
  public supplier: SupplierDto;
  public page = 0;
  public totalPages = 0;
  public limit = 15;
  public sortOrder = 'DESC';
  public sortBy = 'supplierName';
  public totalSuppliers: number;
  public supplierName = '';
  public cashierName = 'All';
  public refreshSupplierList = false;
  public noSupplierFound = false;

  public submitEditSupplierFormSubscription: Subscription;

  constructor(
    private supplierApiService: SupplierApiService,
    private emittersService: EmittersService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.submitEditSupplierFormSubscription = this.emittersService.emitEditSupplierEventEmmiter.subscribe(data => {
      this.refreshSupplierList = data;
      if (this.refreshSupplierList === true) {
        this.suppliers = [];
        this.getAllSuppliersFromDB();
      }
    });
  }

  ngOnDestroy(): void {
    this.submitEditSupplierFormSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.getAllSuppliersFromDB();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }

  openEditModal(supplierId: number) {
    this.supplierApiService.getSupplierById(supplierId).subscribe(
      data => {
        this.supplier = data;
      });
    setTimeout(() => {
      this.modalController.create({
        component: EditSupplierModalPage,
        cssClass: 'edit-supplier-modal-container',
        componentProps: {
          supplier: this.supplier
        }
      }).then((modalElement) => {
        modalElement.present();
      });
    }, 100);
  }

  searchBySupplierName(supplierName: string) {
    this.supplierName = supplierName;
    this.getAllSuppliersFromDB();
  }

  showOrHideFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getAllSuppliersFromDB(event?, isLoadevent?) {
    if (!isLoadevent) {
      this.page = 0;
      this.suppliers = [];
      this.totalSuppliers = 0;
    }
    this.supplierApiService.getAllSuppliersThroughFilter(this.supplierName, this.page, this.limit, this.sortOrder, this.sortBy).subscribe(
      (data = FilterSupplierListDto) => {
        this.suppliers = [...this.suppliers, ...data.supplierDtos];

        this.totalPages = data.totalPages;
        this.totalSuppliers = this.totalSuppliers + data.totalElements;

        if (this.totalPages === 0) {
          this.noSupplierFound = true;
        } else {
          this.noSupplierFound = false;
        }

        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.getAllSuppliersFromDB(event, true);
    }, 500);
  }

  routeTo() {
    this.router.navigate(['/add-supplier']);
  }
}
