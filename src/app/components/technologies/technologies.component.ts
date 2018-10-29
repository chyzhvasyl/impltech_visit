import { Component, OnInit } from '@angular/core';
import {TranslatingService} from '../../services/translating.service';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {ModalBoxService} from '../../services/modal-box.service';
import {HostListener} from '@angular/core';


@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css', '../main/main.component.css']
})

export class TechnologiesComponent implements OnInit {
  screen_width: number = window.innerWidth;
  constructor(private translate: TranslatingService, private open_modal: ModalBoxService) {
    this.socket = io(environment.ws_url);

  }
  index = 0;
  socket;
  numberOfOnlineUsers: number;

  switchLanguage(index) {
    index = this.index++;
    if ( index % 2 === 0) {
      this.translate.language = 'en';
    } else {
      this.translate.language = 'rus';
    }
    this.translate.switchLanguage(this.translate.language);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screen_width = event.target.innerWidth;
  }


  ngOnInit() {
    this.socket.on('online', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
    this.socket.on('disconnect', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
this.open_modal.open_modal();
  }

}
