import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto, ProductListDto, FilterProductListDto, OrderDto, OrderProductDto, FilterOrderListDto } from '../shared/models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8083/';

  constructor(private http: HttpClient) { }

  // products
  getAllProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.baseUrl + '/product/all');
  }

  getProductById(productId: number): Observable<ProductDto | any> {
    return this.http.get<ProductDto | any>(this.baseUrl + 'product/id/?productId=' + productId);
  }

  getAllProductThroughFilter(productName: string, supplierName: string, category: string, pageNumber: number, pageSize: number, sortOrder: string, sortBy: string): Observable<FilterProductListDto[] | any> {
    return this.http.get<FilterProductListDto[] | any>
      (this.baseUrl + 'product/filter/?productName=' + productName + '&supplierName=' + supplierName + '&category=' + category + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sortBy=' + sortBy);
  }

  saveAllProducts(productListDto: ProductListDto): Observable<ProductListDto> {
    return this.http.post<ProductListDto>(this.baseUrl + 'product/saveProducts', productListDto);
  }

  editProduct(productDto: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(this.baseUrl + 'product/editProduct', productDto);
  }

  // point of sale
  saveOrder(orderDto: OrderDto) {
    return this.http.post(this.baseUrl + 'order/saveOrder', orderDto);
  }

  // order history
  getAllOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(this.baseUrl + '/order/all');
  }

  getAllOrdersThroughFilter(customerName: string, cashierName: string, pageNumber: number, pageSize: number, sortOrder: string, sortBy: string): Observable<FilterOrderListDto[] | any> {
    return this.http.get<FilterOrderListDto[] | any>
      (this.baseUrl + 'order/filter/?customerName=' + customerName + '&cashierName=' + cashierName + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sortBy=' + sortBy);
  }
}
