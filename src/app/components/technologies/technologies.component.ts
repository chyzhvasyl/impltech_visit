import {Component, OnInit} from '@angular/core';
import {TranslatingService} from '../../services/translating.service';
import {ModalBoxService} from '../../services/modal-box.service';
import {HostListener} from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css', '../main/main.component.css']
})

export class TechnologiesComponent implements OnInit {
  screen_width: number = window.innerWidth;

  constructor(private translate: TranslatingService, private open_modal: ModalBoxService) {
  }

  index = 0;
  iterator = 0;

  switchLanguage(index) {
    index = this.index++;
    if (index % 2 === 0) {
      this.translate.language = 'en';
    } else {
      this.translate.language = 'rus';
    }
    this.translate.switchLanguage(this.translate.language);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screen_width = event.target.innerWidth;
  }

  margin_top() {
// let div = document.getElementsByClassName('absolute_center');
    this.iterator++;
    const div1 = $('.absolute_center  ');
    if (this.iterator % 2 === 0) {
      $(document).ready(function () {
        div1.removeClass('margin_top');

      });
    } else {
      $(document).ready(function () {
        div1.addClass('margin_top');

      });
    }

  }

  ngOnInit() {
    this.open_modal.open_modal();
  }

}
