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

  @HostListener('window:scroll', [])
  onScroll() {
    const techDiv = document.getElementById('technologies').getBoundingClientRect();
    const headerHeight = document.getElementById('head').getBoundingClientRect().bottom;
    const winHeight = document.documentElement.clientHeight;
    const upTop = (techDiv.bottom - techDiv.height / 2 - headerHeight) <= 0;
    const downBottom = (techDiv.top + techDiv.height / 2 - winHeight) >= 0;
    const smallScreen = document.documentElement.clientWidth <= 800;
    const mobBlock = $('#mobile');
    const webBlock = $('#web');
    const icons = $('.icons');
    const icons2 = $('.icons2');
    // const icons = $('.icons');
    if (smallScreen) {
      return;
    } else if (!upTop && !downBottom) {
      mobBlock.addClass('block-mobile-end');
      mobBlock.removeClass('block-mobile-start');
      webBlock.addClass('block-web-end');
      webBlock.removeClass('block-web-start');
      icons.addClass('tech-icons-end');
      icons.removeClass('tech-icons-start');
      icons2.addClass('tech-icons2-end');
      icons2.removeClass('tech-icons2-start');
    } else {
      mobBlock.addClass('block-mobile-start');
      mobBlock.removeClass('block-mobile-end');
      webBlock.addClass('block-web-start');
      webBlock.removeClass('block-web-end');
      icons.addClass('tech-icons-start');
      icons.removeClass('tech-icons-end');
      icons2.addClass('tech-icons2-start');
      icons2.removeClass('tech-icons2-end');
    }
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
