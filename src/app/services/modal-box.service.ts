import { Injectable } from '@angular/core';
import $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ModalBoxService {
  constructor() { }
  //need рєфачить

  open_modal()
  {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('myBtn');
    const span: HTMLElement = document.getElementsByClassName('close1')[0] as HTMLElement;
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
  openEsimate()
  {
    const modal = document.getElementById('estimateModal');
    const btn = document.getElementById('estimateButton');
    const submitBtn = document.getElementById('submitButton');
    const span: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
    btn.onclick = function() {
      modal.style.display = 'block';
    };
    submitBtn.onclick = function() {
      modal.style.display = 'none';
      /*
        -webkit-animation-name: animatebot;
  -webkit-animation-duration: 0.4s;
  animation-name: animatebot;
  animation-duration: 0.4s;
       */
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
