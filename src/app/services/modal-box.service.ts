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
    const span: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
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
