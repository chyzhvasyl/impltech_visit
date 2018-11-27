import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Form} from '../classes/user';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: Form = new Form();
  form: any = {};
  files: any;
  constructor(private upload: MessageService, public http: Http ) {

    this.form = {
      mail: ''
    };

  }


  addFile(event) {
    let target = event.target || event.srcElement;
    this.files = target.files;
  }

  submitFeedback( ) {

    let final_data;
    if (this.files) {
      let files: FileList = this.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('graph', files[i]);
      }
      formData.append('data', this.feedbackForm.mail);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions( {headers: headers });
      final_data = formData;
    }

    else
      {
      final_data = this.feedbackForm.mail;
    }


    return this.http.post(environment.api_url +  `/api/upload_file`, final_data /*, options */)
      .toPromise()
      .then(
        res => {
          console.log('res', res.json());
          return res.json();

        },
        err => {
          console.log('error', err.json());
          return err.json();
        }
      );
  }

  // uploadFile(event)
  // {
  //   this.upload.submitFeedback(event, this.feedbackForm).subscribe(data => {
  //       console.log('success' + data);
  //     },
  //     error => {
  //         console.log('error' + error);
  //     }
  //   );
  // }

  ngOnInit() {
  }

}
