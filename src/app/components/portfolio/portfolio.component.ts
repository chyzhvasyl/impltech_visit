import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css', '../main/main.component.css']
})
export class PortfolioComponent implements OnInit {
  id: string;
  projectList = [];
  page: number;
  maxSize: number;
  pageSize: number;
  private subscription: Subscription;
  constructor(public getListProject: MessageService, private route: ActivatedRoute) {
    this.page = 1;
    this.maxSize = 5;
    this.pageSize = 6;
  }
 changePage(page) {
 const pageItems = this.projectList;
 const length = this.projectList.length;
 for (let i = 0; i <= this.projectList.length; i++ ) {

 }


 }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => this.id = params['id']);
    this.getListProject.getListProjects().then( res => {
      this.projectList = res.projects ;
      return this.projectList;
    }).catch(error => {
      console.log('error', error);
      return error;
      }
    );
  }

}
