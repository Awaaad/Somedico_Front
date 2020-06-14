import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarningModalPage } from './warning-modal.page';

describe('WarningModalPage', () => {
  let component: WarningModalPage;
  let fixture: ComponentFixture<WarningModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarningModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
