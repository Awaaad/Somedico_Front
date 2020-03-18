import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';

export class ProductDto {
    productId: number;
    productName: string;
    description: string;
    category: string;
    makeDate: Date;
    expiryDate: Date;
    supplier: string;
    price: number;
    quantity: number;
    stock: StockDto;
}

export class StockDto {
    stockId: number;
    stockName: string;
    dateAdded: Date;
    user: UserDto;
}

export class UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: number;
}