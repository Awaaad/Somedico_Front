import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderNavComponent } from '../app/shared/components/header-nav/header-nav.component';
import { SideNavComponent } from '../app/shared/components/side-nav/side-nav.component';
import { FooterComponent } from '../app/shared/components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { EditProductModalPageModule } from './shared/modals/edit-product-modal/edit-product-modal.module';
import { ConfirmationModalPageModule } from './shared/modals/confirmation-modal/confirmation-modal.module';
import { DateFormatterPipe } from './services/pipes/date-formatter.pipe';
import { EditSupplierModalPageModule } from './shared/modals/edit-supplier-modal/edit-supplier-modal.module';
import { WarningModalPageModule } from './shared/modals/warning-modal/warning-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    SideNavComponent,
    FooterComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    EditProductModalPageModule,
    EditSupplierModalPageModule,
    ConfirmationModalPageModule,
    WarningModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
