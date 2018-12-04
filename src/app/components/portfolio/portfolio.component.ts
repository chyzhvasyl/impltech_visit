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
  pagedItems: any[];
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
 const totalPages = Math.ceil(length /  this.pageSize);
   if (page < 1) {
     page = 1;
   } else if (page > totalPages) {
     page = totalPages;
   }
   const startIndex = (page - 1) * this.pageSize;
   const endIndex = Math.min(startIndex + this.pageSize - 1, length - 1);
   this.pagedItems = pageItems.slice(startIndex, endIndex + 1);
 }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => this.id = params['id']);
    this.getListProject.getListProjects().then( res => {
      this.projectList = res.projects ;
      this.changePage(this.page);
      return this.projectList;
    }).catch(error => {
      console.log('error', error);
      return error;
      }
    );
  }

}
