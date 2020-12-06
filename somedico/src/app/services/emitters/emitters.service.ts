import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmittersService {

  @Output() public emitAddProductEventEmmiter = new EventEmitter<boolean>();
  @Output() public emitEditProductEventEmmiter = new EventEmitter<boolean>();
  @Output() public emitEditSupplierEventEmmiter = new EventEmitter<boolean>();
  @Output() public resetPOS = new EventEmitter<boolean>();
  @Output() public resetOrderList = new EventEmitter<boolean>();

  constructor() { }
}
