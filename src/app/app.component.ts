import { Component, LOCALE_ID, Inject } from '@angular/core';
import { StateService } from './state/state.service';
import { LocaleType } from './model/locale-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WotBlitzStatisticsPro';

  constructor(@Inject(LOCALE_ID) private localeId: string,
              private state: StateService) {
    if (localeId === 'en' || localeId === 'ru' || localeId === 'de') {
      this.state.LocaleChanged(localeId as LocaleType);
    }
   }

// npm run build-i18n
// http-server -p 8080 -c-1 dist

  private _selectedLocale = this.localeId;

  public get selectedLocale(): string {
    return this._selectedLocale;
  }
  public set selectedLocale(newLocale: string) {
    this._selectedLocale = newLocale;
    switch (newLocale) {
      case 'ru':
        window.location.href = '/ru';
        break;
      case 'de':
        window.location.href = '/de';
        break;
      default:
        window.location.href = '/';
        break;
    }
  }
}
