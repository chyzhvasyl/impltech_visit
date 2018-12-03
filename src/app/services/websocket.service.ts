import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  //public massage_history: any;

  constructor() { }
  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.ws_url);
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
        this.socket.emit('msg', data);

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
  getSocket() {
    return new Observable(observer => {
      this.socket.on('connection', (messages) => {
        //console.log('connection', messages);
        // messages.reverse();
        observer.next(messages);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
