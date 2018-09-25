import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import {trigger, state, style, transition,
  animate, group, query, stagger, keyframes} from '@angular/animations';
import {TranslatingService} from '../../services/translating.service';





@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({transform: 'translateY(0)', opacity: 1})),
      transition(':enter', [
        style({transform: 'translateY(-100%)', opacity: 0}),
        animate(1500)
      ]),
      transition(':leave', [
        animate(1500, style({transform: 'translateY(100%)',  opacity: 0}))
      ])
    ])

  ]
})
export class MainComponent implements OnInit {
  index = 0;
  constructor(private smooth: SimpleSmoothScrollService, private translate: TranslatingService) { }
  switchLanguage(index) {
     index = this.index++;
    if ( index % 2 === 0) {
      this.translate.language = 'en';
    } else {
      this.translate.language = 'rus';
    }
    this.translate.switchLanguage(this.translate.language);
  }
  ngOnInit() {
    this.smooth.smoothScrollToAnchor();
  }

  goTop(){
    this.smooth.smoothScrollToTop({ duration: 1000, easing: 'linear' });
  }

}
