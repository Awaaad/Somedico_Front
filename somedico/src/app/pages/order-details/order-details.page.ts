import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OrderProductDto } from 'src/app/shared/models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public orderDetails: OrderProductDto[] = [];
  public orderDate: Date;
  public customerName: string;
  public grandTotal: number;
  public orderId: any = this.activatedRoute.snapshot.paramMap.get('orderId');
  public print = true;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderDate = new Date();
    this.apiService.getOrderDetailsByOrderId(this.orderId).subscribe((orderDetails => {
      this.orderDetails = orderDetails;
      // console.log('1',orderDetails.boxesOrdered);
      this.customerName = this.orderDetails[0].orderDto.customerName;
      this.grandTotal = this.orderDetails[0].orderDto.totalPrice;
      this.orderDetails.forEach((order, index) => {
        this.orderDetails[index].boxesOrdered = this.orderDetails[index].unitsOrdered / this.orderDetails[index].productDto.unitsPerBox;
      });
      // this.orderDetails.forEach((order, index) => {
      //   this.orderDetails[index].unitsOrdered = orderDetails[index].unitsOrdered - (orderDetails[index].boxesOrdered * orderDetails[index].productDto.unitsPerBox);
      // });
      // console.log(this.orderDetails.boxesOrdered);
    }));
  }

  public printReceipt(): void {
    this.print = false;
    setTimeout(() => {
      window.print();
    }, 500);
    setTimeout(() => {
      this.print = true;
    }, 500);
  }

}
