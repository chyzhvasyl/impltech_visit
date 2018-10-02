import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  user: string;
  message: string;

  constructor(private messageService: MessageService) { }

  newMessage(text: string, user: string): void {
    this.messageService.send({text: text, user: user});
    this.message = '';
  }
  ngOnInit() {
  }

}
