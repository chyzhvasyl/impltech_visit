import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TranslatingService {
//  index = 0;
  language: string;
  constructor(private translate: TranslateService ) {
    translate.setDefaultLang('rus');
  }
  switchLanguage(language)
  {
   // if ( index % 2 === 0) {
   //   this.language = 'en';
   // } else {
   //   this.language = 'rus';
   // }
    language = this.language;
    this.translate.use(language);
  }
}
