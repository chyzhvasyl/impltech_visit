import { Injectable } from '@angular/core';
import $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ModalBoxService {

  constructor() { }

  open_modal(){
    // modal box
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



}
