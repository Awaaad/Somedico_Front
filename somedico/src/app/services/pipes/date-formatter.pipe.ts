import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils/utils.service';

@Pipe({
  name: 'DateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  constructor(
    private utilService: UtilsService
    ) {
  }

  transform(value: any, lang: any, ...args: any[]): any {
    return value ? this.utilService.formatDateBasedOnUsersBrowser(value, lang) : null;
  }

}
