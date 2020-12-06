import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto, FilterProductListDto, ProductListDto } from 'src/app/shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class ProductApiService {

    baseUrl = 'http://localhost:8083/product/';
    // baseUrl = 'https://5914eb0d82e9.ngrok.io/';

    constructor(private http: HttpClient) { }

    // products
    getAllProducts(): Observable<ProductDto[]> {
        return this.http.get<ProductDto[]>(this.baseUrl + 'all');
    }

    getProductById(productId: number): Observable<ProductDto | any> {
        return this.http.get<ProductDto | any>(this.baseUrl + 'id/?productId=' + productId);
    }

    getAllProductThroughFilter(productName: string, supplierName: string, category: string, pageNumber: number, pageSize: number, sortOrder: string, sortBy: string): Observable<FilterProductListDto[] | any> {
        return this.http.get<FilterProductListDto[] | any>
            (this.baseUrl + 'filter/?productName=' + productName + '&supplierName=' + supplierName + '&category=' + category + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sortBy=' + sortBy);
    }

    saveAllProducts(productListDto: ProductListDto): Observable<ProductListDto> {
        return this.http.post<ProductListDto>(this.baseUrl + 'saveProducts', productListDto);
    }

    editProduct(productDto: ProductDto): Observable<ProductDto> {
        return this.http.put<ProductDto>(this.baseUrl + 'editProduct', productDto);
    }
}
