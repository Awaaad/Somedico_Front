import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmittersService {

  @Output() public emitAddProductEventEmmiter = new EventEmitter<boolean>();
  @Output() public emitEditProductEventEmmiter = new EventEmitter<boolean>();

  constructor() { }
}
