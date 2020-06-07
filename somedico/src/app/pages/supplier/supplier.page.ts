import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierDto, FilterSupplierListDto } from 'src/app/shared/models/models';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EmittersService } from 'src/app/services/emitters.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public showFilter = false;
  public suppliers: SupplierDto[] = [];
  public page = 0;
  public totalPages = 0;
  public limit = 15;
  public sortOrder = 'DESC';
  public sortBy = 'supplierName';
  public totalSuppliers: number;
  public supplierName = '';
  public cashierName = 'All';

  constructor(
    private apiService: ApiService,
    private emittersService: EmittersService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getAllSuppliersFromDB();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
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
    this.apiService.getAllSuppliersThroughFilter(this.supplierName, this.page, this.limit, this.sortOrder, this.sortBy).subscribe(
      (data = FilterSupplierListDto) => {
        console.log(data);
        this.suppliers = [...this.suppliers, ...data.supplierDtos];

        this.totalPages = data.totalPages;
        this.totalSuppliers = this.totalSuppliers + data.totalElements;

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
      this.getAllSuppliersFromDB(event, true);
    }, 500);
  }
}
