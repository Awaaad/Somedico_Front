import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto, CustomerReceiptDto, FilterOrderListDto, OrderProductDto, ProductDto } from 'src/app/shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class OrderApiService {

    baseUrl = 'http://localhost:8083/order/';
    // baseUrl = 'https://5914eb0d82e9.ngrok.io/';

    constructor(private http: HttpClient) { }

    // point of sale
    saveOrder(orderDto: OrderDto) {
        return this.http.post(this.baseUrl + 'saveOrder', orderDto);
    }

    // order history
    getAllOrders(): Observable<OrderDto[]> {
        return this.http.get<OrderDto[]>(this.baseUrl + 'all');
    }

    getReceiptDetails(orderId: number): Observable<CustomerReceiptDto> {
        return this.http.get<CustomerReceiptDto>(this.baseUrl + `customerReceipt/${orderId}`);
    }

    getAllOrdersThroughFilter(customerName: string, cashierName: string, pageNumber: number, pageSize: number, sortOrder: string, sortBy: string): Observable<FilterOrderListDto[] | any> {
        return this.http.get<FilterOrderListDto[] | any>
            (this.baseUrl + 'filter/?customerName=' + customerName + '&cashierName=' + cashierName + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&sortOrder=' + sortOrder + '&sortBy=' + sortBy);
    }

    editOrderPayment(orderDto: OrderDto): Observable<OrderDto> {
        return this.http.put<OrderDto>(this.baseUrl + 'editOrder', orderDto);
    }

}
