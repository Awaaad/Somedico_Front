import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierDto, FilterSupplierListDto, SupplierListDto } from 'src/app/shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class SupplierApiService {

    baseUrl = 'http://localhost:8083/supplier/';
    // baseUrl = 'https://5914eb0d82e9.ngrok.io/';

    constructor(private http: HttpClient) { }

    // supplier
    getAllSuppliers(): Observable<SupplierDto[]> {
        return this.http.get<SupplierDto[]>(this.baseUrl + 'all');
    }

    getAllSuppliersThroughFilter(supplierName: string, pageNumber: number, pageSize: number, sortOrder: string, sortBy: string): Observable<FilterSupplierListDto[] | any> {
        return this.http.get<FilterSupplierListDto[] | any>
            (this.baseUrl + 'filter/?supplierName=' + supplierName + '&cashierName=' + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sortBy=' + sortBy);
    }

    getSupplierById(supplierId: number): Observable<SupplierDto | any> {
        return this.http.get<SupplierDto | any>(this.baseUrl + 'id/?supplierId=' + supplierId);
    }

    saveAllSuppliers(supplierListDto: SupplierListDto): Observable<SupplierListDto> {
        return this.http.post<SupplierListDto>(this.baseUrl + 'saveSuppliers', supplierListDto);
    }

    editSupplier(supplierDto: SupplierDto): Observable<SupplierDto> {
        return this.http.put<SupplierDto>(this.baseUrl + 'editSupplier', supplierDto);
    }

}
