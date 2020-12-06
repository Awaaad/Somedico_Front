import { Component, OnInit } from '@angular/core';
import { CustomerReceiptDto } from 'src/app/shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { OrderApiService } from 'src/app/services/api/order-api/order.api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public orderDetails: CustomerReceiptDto;
  public orderId: any = this.activatedRoute.snapshot.paramMap.get('orderId');
  public print = true;

  constructor(
    private orderApiService: OrderApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getReceiptDetails();
  }

  private getReceiptDetails(): void {
    this.orderApiService.getReceiptDetails(this.orderId).subscribe((orderDetails => {
      this.orderDetails = orderDetails;
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
