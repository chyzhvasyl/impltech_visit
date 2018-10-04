import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { SimpleSmoothScrollOption } from 'ng2-simple-smooth-scroll';
import {trigger, state, style, transition,
  animate, group, query, stagger, keyframes} from '@angular/animations';
import {TranslatingService} from '../../services/translating.service';
import {User} from '../classes/user';
import {ChatService} from '../../services/chat.service';

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
      ]),
    ]),
trigger('fadein', [
  state('inside', style({ opacity: 1})),
  transition(':enter', [
    style({ opacity: 0}),
    animate(700)
  ]),
  transition(':leave', [
    animate(700, style({ opacity: 0}))
  ])
])
  ]
})
export class MainComponent implements OnInit {
  index = 0;
  display = false;
  user: User = new User();
  constructor(private smooth: SimpleSmoothScrollService, private translate: TranslatingService,
          private chat: ChatService ) {
  }
  switchLanguage(index) {
     index = this.index++;
    if ( index % 2 === 0) {
      this.translate.language = 'en';
    } else {
      this.translate.language = 'rus';
    }
    this.translate.switchLanguage(this.translate.language);
  }
  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

  signin(){

    console.log(this.user);

  }
  ngOnInit() {
this.chat.messages.subscribe(msg => {
 console.log(msg);
});
    this.smooth.smoothScrollToAnchor();
    let modal = document.getElementById('myModal');
    let btn = document.getElementById('myBtn');
    let span: HTMLElement = document.getElementsByClassName('close1')[0] as HTMLElement;
    btn.onclick = function() {
      modal.style.display = 'block';
    };
    span.onclick = function() {
      modal.style.display = 'none';
    };
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

  }
sendMessage()
{
  this.chat.sendmessage(this.user);
}
  goTop(){
    this.smooth.smoothScrollToTop({ duration: 1000, easing: 'linear' });
  }
}
