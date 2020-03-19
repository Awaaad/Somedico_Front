import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PointOfSalePage } from './point-of-sale.page';

describe('PointOfSalePage', () => {
  let component: PointOfSalePage;
  let fixture: ComponentFixture<PointOfSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointOfSalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PointOfSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
