import {Pusher} from 'pusher-js';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
declare const Pusher: any;
// declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})

export class PusherService {
  pusher: any;

  messagesChannel: any;
  constructor() {

    this.initializePusher();

  }

  initializePusher(): void {
    this.pusher = new Pusher(environment.pusher.key, { authEndpoint: 'http://localhost:8090/api/pusher/auth' });
    this.messagesChannel = this.pusher.subscribe('private-all-messages');
  }
}
