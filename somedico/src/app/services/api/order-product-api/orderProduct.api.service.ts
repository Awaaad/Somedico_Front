import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderProductDto, ProductDto } from 'src/app/shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class OrderProductApiService {

    baseUrl = 'http://localhost:8083/';
    // baseUrl = 'https://5914eb0d82e9.ngrok.io/';

    constructor(private http: HttpClient) { }

    // order details
    getOrderDetailsByOrderId(orderId: number): Observable<OrderProductDto | any> {
        return this.http.get<ProductDto | any>(this.baseUrl + 'orderProduct/orderId/' + orderId);
    }

}
