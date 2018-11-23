import { Component, OnInit } from '@angular/core';
import {ModalBoxService} from '../../services/modal-box.service';

@Component({
  selector: 'app-detailed-form',
  templateUrl: './detailed-form.component.html',
  styleUrls: ['./detailed-form.component.css']
})
export class DetailedFormComponent implements OnInit {

  constructor(public open_modalbox: ModalBoxService) { }

  ngOnInit() {
    this.open_modalbox.openEsimate();
  }

}
