import { Component, OnInit } from '@angular/core';
import {ModalBoxService} from '../../services/modal-box.service';
import {deteiledForm, Form} from '../classes/user';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-detailed-form',
  templateUrl: './detailed-form.component.html',
  styleUrls: ['./detailed-form.component.css']
})
export class DetailedFormComponent implements OnInit {
  deteiledForm: deteiledForm = new deteiledForm();
  constructor(public open_modalbox: ModalBoxService, public senddetailedForm: MessageService)
  { }
  sendForm(){
    console.log('form', this.deteiledForm);
    this.senddetailedForm.senddetailedForm(this.deteiledForm);
  }
  ngOnInit() {
   // this.open_modalbox.openEsimate();
  }
}
