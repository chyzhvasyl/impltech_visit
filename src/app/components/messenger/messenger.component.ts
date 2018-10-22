import { Component, OnInit } from '@angular/core';
import {User} from '../classes/user';
import {Message} from '../classes/message';
import {WebsocketService} from '../../services/websocket.service';
import {ChatService} from '../../services/chat.service';
import * as io from 'socket.io-client';
import $ from 'jquery';
import {environment} from '../../../environments/environment';
import {ModalBoxService} from '../../services/modal-box.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  index = 0;
  display = false;
  user: User = new User();
  message: Message = new Message();
  message_array: any = [];
  socket;
  numberOfOnlineUsers: number;
  constructor( private chatservice: ChatService, private websocketservice: WebsocketService, private open_modalbox: ModalBoxService )
  {
    this.socket = io(environment.ws_url);


  }
  chat_autoscroll() {
    $(document).ready(function () {
      const chat_body =  $('.chat_body');
      const chat_height = chat_body.prop('scrollHeight');
      chat_body.scrollTop(chat_height);
    });
  }
  sendMessage()
  {
    this.chatservice.sendmessage(this.message.content);
    this.chat_autoscroll();

  }
  ngOnInit() {
    this.websocketservice.getMessages().subscribe(message => {
      this.message_array = message;
      this.message_array.reverse();
    });

    //this.message_array.push(environment.message_history);
    this.chatservice.messages.subscribe(msg => {
      this.message.date = msg.date;
      this.message._id = msg.id;
      this.message.content = msg.content;
      this.message_array.push({
        date: this.message.date,
        _id: this.message._id,
        content: this.message.content,
      });
      this.chat_autoscroll();
      this.message.content = '';

    });
    this.open_modalbox.open_modal();

  }

}
