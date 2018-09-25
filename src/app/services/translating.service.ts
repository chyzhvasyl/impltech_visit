import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})



export class TranslatingService {
  language: string;


  constructor(private translate: TranslateService ) {
    translate.setDefaultLang('rus');
  }
  switchLanguage(language)
  {
    language = this.language;
    this.translate.use(language);
  }
}
