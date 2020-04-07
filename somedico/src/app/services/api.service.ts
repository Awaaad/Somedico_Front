import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto, ProductListDto, FilterProductListDto, OrderDto } from '../shared/models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8083/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.baseUrl + '/product/all');
  }

  getProductById(productId: number): Observable<ProductDto | any> {
    return this.http.get<ProductDto | any>(this.baseUrl + 'product/id/?productId=' + productId);
  }
  // tslint:disable-next-line: max-line-length
  getAllProductThroughFilter(productName: string, supplierName: string, category: string, pageNumber: number, pageSize: number, sortOrder: string, sortBy: string): Observable<FilterProductListDto[] | any> {
    return this.http.get<FilterProductListDto[] | any>
    // tslint:disable-next-line: max-line-length
    (this.baseUrl + 'product/filter/?productName=' + productName + '&supplierName=' + supplierName +  '&category=' + category + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sortBy=' + sortBy);
  }

  saveAllProducts(productListDto: ProductListDto): Observable<ProductListDto> {
    return this.http.post<ProductListDto>(this.baseUrl + 'product/saveProducts', productListDto);
  }

  editProduct(productDto: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(this.baseUrl + 'product/editProduct', productDto);
  }

  saveOrder(orderDto: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.baseUrl + 'order/saveOrder', orderDto);
  }
}
