import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDto, StockDto, UserDto } from '../shared/models/models';
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
}
