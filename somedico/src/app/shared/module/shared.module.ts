import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HeaderNavComponent } from '../components/header-nav/header-nav.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DateFormatterPipe } from 'src/app/services/pipes/date-formatter.pipe';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ApiService } from 'src/app/services/api.service';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';


@NgModule({
    declarations: [
        DateFormatterPipe
    ],
    entryComponents: [],
    imports: [

    ],
    providers: [
    ],
    exports: [
        DateFormatterPipe
    ]
})
export class SharedModule { }
