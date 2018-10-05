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
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PusherService} from './services/pusher.service';
import {routes} from './services/routing/routing-routing.module';
import {RouterModule} from '@angular/router';
import { NewMessageComponent } from './components/new-message/new-message.component';
import {MessageService} from './services/message.service';
import {ChatService} from './services/chat.service';
import {WebsocketService} from './services/websocket.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/');
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ParallaxDirective,
    NewMessageComponent
  ],
  imports: [
    BrowserModule, SimpleSmoothScrollModule, BrowserAnimationsModule, HttpClientModule, DialogModule, CommonModule, TabViewModule, CodeHighlighterModule, ButtonModule,
    InputTextModule, ReactiveFormsModule, FormsModule, RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslatingService, PusherService, MessageService, ChatService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
