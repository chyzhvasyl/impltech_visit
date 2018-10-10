import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../../components/main/main.component';
import {TechnologiesComponent} from '../../components/technologies/technologies.component';
import {PortfolioComponent} from '../../components/portfolio/portfolio.component';
import { ServicesComponent} from '../../components/services/services.component';
import {PagenotfoundComponent} from '../../components/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'technologies',
    component: TechnologiesComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingRoutingModule { }

