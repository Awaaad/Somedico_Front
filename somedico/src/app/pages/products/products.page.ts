import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products = [];
  showFilter = false;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  showOrHideFilter() {
    this.showFilter = !this.showFilter;
  }

}
