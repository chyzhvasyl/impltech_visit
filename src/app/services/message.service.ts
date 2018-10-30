import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import {promise} from 'selenium-webdriver';
import rejected = promise.rejected;



export interface Message {
  text: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor( private http: Http) {
  }
  login(user) {
      const login_url = `http://localhost:8090/api/auth`;
        return this.http.post(login_url, user).toPromise()
    .then(
    res => {
      return res;
    },
    err => {
      console.log('error', err.json());
      return err;
    }
  );
  }


// другий варік але він не передає в компонент резалт
  login1(user) {
    const login_url = `http://localhost:8090/api/auth`;
    let promise = new Promise((resolve, reject) => {

      this.http.post(login_url, user).toPromise()
        .then(
          res => { // Success
            resolve();
            console.log('ответ от сервера', res.json());
return res;
          }

        );

    });


    return promise;
  }
}


