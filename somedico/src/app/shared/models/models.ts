import { NumberSymbol } from '@angular/common';
import { IonDatetime } from '@ionic/angular';

export class ProductDto {
    productId: number;
    productName: string;
    description: string;
    dosage: string;
    category: string;
    box: number;
    unitsPerBox: number;
    unitsTotal: number;
    pricePerBox: number;
    pricePerUnit: number;
    requirePrescription: boolean;
    supplier: SupplierDto;
    boxesOrdered?: number;
    unitsOrdered?: number;
    total?: number;
}

export class SupplierDto {
    supplierId: number;
    supplierName: string;
    email: string;
    telephoneNumber: number;
    address: string;
}

export class UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: number;
}

export class ProductListDto {
    productDtos: ProductDto[];
}

export class SupplierListDto {
    supplierDtos: SupplierDto[];
}

export class FilterProductListDto {
    productDtos: ProductDto[];
    totalElements: number;
    totalPages: number;
}

export class FilterOrderListDto {
    orderDtos: OrderDto[];
    totalElements: number;
    totalPages: number;
}

export class FilterSupplierListDto {
    supplierDtos: SupplierDto[];
    totalElements: number;
    totalPages: number;
}

export class OrderDto {
    orderId?: number;
    cashierName: string;
    customerName: string;
    orderDate: Date;
    paid?: boolean;
    orderProductDtos: OrderProductDto[];
    totalPrice: number;
}

export class OrderProductDto {
    orderProductId: number;
    productDto: ProductDto;
    productName: string;
    boxesOrdered: number;
    unitsOrdered: number;
    totalPrice: number;
}
