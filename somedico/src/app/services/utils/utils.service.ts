import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public formatDateBasedOnUsersBrowser(dateToFormat: Date, lang?: string): string {
    return new Date(dateToFormat).toLocaleDateString(lang, { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  public formatTimeBasedOnUsersBrowser(dateToFormat: Date): string {
    return new Date(dateToFormat).toLocaleString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  }
}
