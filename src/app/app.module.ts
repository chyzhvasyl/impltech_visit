import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ParallaxDirective } from './components/parallax.directive';
import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslatingService} from './services/translating.service';
import {DialogModule} from 'primeng/dialog';
import {CommonModule} from '@angular/common';
import {TabViewModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import {routes} from './services/routing/routing-routing.module';
import {RouterModule} from '@angular/router';
import {MessageService} from './services/message.service';
import {ChatService} from './services/chat.service';
import {WebsocketService} from './services/websocket.service';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { HttpModule } from '@angular/http';
import {NoPreloading} from '@angular/router';
import {AppPreloadingStrategy} from './components/classes/app-preloading-strategy';
import {ProgressBarModule} from 'primeng/progressbar';
import { EstimatingComponent } from './components/estimating/estimating.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { DetailedFormComponent } from './components/detailed-form/detailed-form.component';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { TestComponent } from './components/test/test.component';
import { AboutProjectComponent } from './components/about-project/about-project.component';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/');
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ParallaxDirective,
    TechnologiesComponent,
    PortfolioComponent,
    ServicesComponent,
    PagenotfoundComponent,
    MessengerComponent,
    EstimatingComponent,
    FeedbackFormComponent,
    DetailedFormComponent,
    TestComponent,
    AboutProjectComponent,
    AllProjectsComponent,
  ],
  imports: [
    BrowserModule, SimpleSmoothScrollModule, BrowserAnimationsModule, HttpClientModule, DialogModule, CommonModule, TabViewModule,
    CodeHighlighterModule, ButtonModule, InputTextModule, ReactiveFormsModule, FormsModule, HttpModule, ParallaxModule, RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy}),
    ProgressBarModule, NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslatingService, MessageService, ChatService, WebsocketService, AppPreloadingStrategy],
  bootstrap: [AppComponent]
})
export class AppModule { }
