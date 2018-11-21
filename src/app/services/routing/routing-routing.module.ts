import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../../components/main/main.component';
import {TechnologiesComponent} from '../../components/technologies/technologies.component';
import {PortfolioComponent} from '../../components/portfolio/portfolio.component';
import { ServicesComponent} from '../../components/services/services.component';
import {PagenotfoundComponent} from '../../components/pagenotfound/pagenotfound.component';
import {AppPreloadingStrategy} from '../../components/classes/app-preloading-strategy';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: { preload: true, delay: true }
  },
  {
    path: 'technologies',
    component: TechnologiesComponent,
    data: { preload: true, delay: true }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    data: { preload: true, delay: true }
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { preload: true, delay: true }
  },
  {
    path: '**',
    component: PagenotfoundComponent,
    data: { preload: true, delay: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: AppPreloadingStrategy})],
  exports: [RouterModule],
  providers: [AppPreloadingStrategy]
})
export class RoutingRoutingModule { }

