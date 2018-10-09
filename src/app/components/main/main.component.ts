import { Component, OnInit, OnDestroy } from '@angular/core';
import $ from 'jquery';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import {trigger, state, style, transition,
  animate, group, query, stagger, keyframes} from '@angular/animations';
import {TranslatingService} from '../../services/translating.service';
import {User} from '../classes/user';
import {ChatService} from '../../services/chat.service';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Message} from '../classes/message';
import {WebsocketService} from '../../services/websocket.service';

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
  message: Message = new Message();
  message_array: any = [];
  socket;
  numberOfOnlineUsers: number;
  connection;

  constructor(private smooth: SimpleSmoothScrollService, private translate: TranslatingService,
          private chatservice: ChatService, private websocketservice: WebsocketService) {
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
  // отримання часу і нікнейму з сервера
  {
    this.chatservice.sendmessage('Hello');
   this.websocketservice.getMessages().subscribe(message => {
     this.message_array = message;
    });

    //this.message_array.push(environment.message_history);
    this.chatservice.messages.subscribe(msg => {
      this.message.date = msg.date;
      this.message.username = msg.username;
      this.message.content = msg.content;
      this.message_array.push({
        date: this.message.date,
        username: this.message.username,
        content: this.message.content,
      });
      this.chat_autoscroll();
      this.message.content = '';

    });

  // вивід онлайн користувачів на сайті
    this.socket.on('online', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
    this.socket.on('disconnect', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
    // якір
    this.smooth.smoothScrollToAnchor();

    // modal box
    let modal = document.getElementById('myModal');
    let btn = document.getElementById('myBtn');
    let span: HTMLElement = document.getElementsByClassName('close1')[0] as HTMLElement;
    btn.onclick = function() {
      modal.style.display = 'block';
    };
    span.onclick = function() {
      modal.style.display = 'none';
    };
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  // відправка повідомлення
sendMessage()
{
  this.chat_autoscroll();
  this.chatservice.sendmessage(this.message.content);
}
  goTop(){
    this.smooth.smoothScrollToTop({ duration: 1000, easing: 'linear' });
  }

  // опускаємо вниз скрол при відправці повідомлення
  chat_autoscroll() {
    $(document).ready(function () {
      const chat_body =  $('.chat_body');
      const chat_height = chat_body.prop('scrollHeight');
      chat_body.scrollTop(chat_height);
    });
  }


  ngOnDestroy() {
    //this.connection.unsubscribe();
  }
}
