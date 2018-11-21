import { Component, OnInit } from '@angular/core';
import {TranslatingService} from '../../services/translating.service';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {ModalBoxService} from '../../services/modal-box.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css', '../main/main.component.css']
})
export class ServicesComponent implements OnInit {
  constructor(private translate: TranslatingService, private open_modal: ModalBoxService) {



  }
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
