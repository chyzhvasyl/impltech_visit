import { Component, OnInit, OnDestroy } from '@angular/core';
import $ from 'jquery';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import {trigger, state, style, transition,
  animate, group, query, stagger, keyframes} from '@angular/animations';
import {TranslatingService} from '../../services/translating.service';
import {User} from '../classes/user';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({transform: 'translateY(0)', opacity: 1})),
      transition(':enter', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate(1500)
      ]),
      transition(':leave', [
        animate(1500, style({transform: 'translateY(100%)',  opacity: 0}))
      ]),
    ]),
trigger('fadein', [
  state('inside', style({ opacity: 1})),
  transition(':enter', [
    style({ opacity: 0}),
    animate(700)
  ]),
  transition(':leave', [
    animate(700, style({ opacity: 0}))
  ])
])
  ]
})

export class MainComponent implements OnInit {
  index = 0;
  display = false;
  user: User = new User();
  socket;
  socket_id: string;
  numberOfOnlineUsers: number;
  arr_socket = [];

  constructor(private smooth: SimpleSmoothScrollService, private translate: TranslatingService) {
    this.socket = io(environment.ws_url);
  }

  switchLanguage(index) {
     index = this.index++;
    if ( index % 2 === 0) {
      this.translate.language = 'en';
    } else {
      this.translate.language = 'rus';
    }
    this.translate.switchLanguage(this.translate.language);
  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

  signin(){

    console.log(this.user);

  }
  ngOnInit()
  {
  // вивід онлайн користувачів на сайті
    this.socket.on('connection', (socket_id) => {
      this.socket_id = socket_id;
     this.arr_socket.push(socket_id);
      console.log('connection', this.arr_socket);
    });
    this.socket.on('online', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });

    this.socket.on('disconnect', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
    // якір
    this.smooth.smoothScrollToAnchor();

    // open modal
  }
  goTop(){
    this.smooth.smoothScrollToTop({ duration: 1000, easing: 'linear' });
  }

  ngOnDestroy() {
    //this.connection.unsubscribe();
  }
}
