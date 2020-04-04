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
}

export class SupplierDto {
    supplierId: number;
    supplierName: string;
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
    products: ProductDto[];
}

export class FilterProductListDto {
    products: ProductDto[];
    totalElements: number;
    totalPages: number;
}