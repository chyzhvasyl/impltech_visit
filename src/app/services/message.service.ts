import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import {promise} from 'selenium-webdriver';
import {map} from 'rxjs/operators';


export interface Message {
  text: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  form: any = {};
  files: any;
  constructor( private http: Http) {
    this.form = {
      name: {}
    };
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
senddetailedForm(body){
    console.log('body', JSON.stringify(body));
  return this.http.post(environment.api_url +  `/api/feedBackForm`, body/*, options */)
    .toPromise()
    .then(
      res => {
        return res.json();
      },
      err => {
        return err.json();
      }
    );

}

}


