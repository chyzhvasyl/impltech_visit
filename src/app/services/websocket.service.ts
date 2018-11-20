import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket;
  numberOfOnlineUsers: number;
  //public massage_history: any;

  constructor() {


    this.socket = io(environment.ws_url);
    // вивід онлайн користувачів на сайті
    this.socket.on('online', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
      console.log('numberOfOnlineUsers', numberOfOnlineUsers);
    });
    this.socket.on('disconnect', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
  }
  connect(): Rx.Subject<MessageEvent> {

    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('Received message from Websocket Server', 'connected!');
        this.socket.emit('receive_history');
        observer.next(data);
      });
     // this.socket.on('history', messages => {
     //  console.log('history', messages);
//
     // });
      return () => {
        this.socket.disconnect();
      };
    });
    const printed_message = {
      next: (data: Object) => {
        this.socket.emit('message', data);
        //this.socket.emit('history', data);
        console.log(data);
      },
    };
    const message_history = {
      next: (data: Object) => {
        console.log('data', data);
        this.socket.emit('history', data);
      },
    };
    return Rx.Subject.create(printed_message, observable);
  }
  getMessages() {
    return new Observable(observer => {
      this.socket.on('history', (messages) => {
        console.log('history', messages);
       // messages.reverse();
        observer.next(messages);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
