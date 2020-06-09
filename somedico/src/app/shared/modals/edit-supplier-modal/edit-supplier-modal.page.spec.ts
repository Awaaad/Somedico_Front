import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSupplierModalPage } from './edit-supplier-modal.page';

describe('EditSupplierModalPage', () => {
  let component: EditSupplierModalPage;
  let fixture: ComponentFixture<EditSupplierModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSupplierModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSupplierModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
