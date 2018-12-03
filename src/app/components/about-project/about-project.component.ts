import { Component, OnInit } from '@angular/core';
import {TranslatingService} from '../../services/translating.service';
@Component({
  selector: 'app-about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.css']
})
export class AboutProjectComponent implements OnInit {

  constructor(private translate: TranslatingService) { }
  index = 0;
  switchLanguage(index) {
    index = this.index++;
    if ( index % 2 === 0) {
      this.translate.language = 'en';
    } else {
      this.translate.language = 'rus';
    }
    this.translate.switchLanguage(this.translate.language);
  }
  ngOnInit() {

  }

}
