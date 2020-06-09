import { NgModule } from '@angular/core';
import { DateFormatterPipe } from 'src/app/services/pipes/date-formatter.pipe';


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
        DateFormatterPipe,
    ]
})
export class SharedModule { }
