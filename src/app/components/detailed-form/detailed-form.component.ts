import { Component, OnInit } from '@angular/core';
import {ModalBoxService} from '../../services/modal-box.service';
import {deteiledForm, Form} from '../classes/user';
import {MessageService} from '../../services/message.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
declare let $: any;
@Component({
  selector: 'app-detailed-form',
  templateUrl: './detailed-form.component.html',
  styleUrls: ['./detailed-form.component.css'],
  animations: [trigger('fadein', [
    state('inside', style({ opacity: 1})),
    transition(':enter', [
      style({ opacity: 0}),
      animate(1000)
    ]),
    transition(':leave', [
      animate(1000, style({ opacity: 0}))
    ])
  ])]
})
export class DetailedFormComponent implements OnInit {
  deteiledForm: deteiledForm = new deteiledForm();
  submitted = false;
  constructor(public open_modalbox: ModalBoxService, public senddetailedForm: MessageService) {
  }
  sendForm() {
    this.senddetailedForm.senddetailedForm(this.deteiledForm);
    $('#exampleModal').modal('hide');
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 2000);
  }
  ngOnInit() {
   // this.open_modalbox.openEsimate();
  }
}
