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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/');
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ParallaxDirective
  ],
  imports: [
    BrowserModule, SimpleSmoothScrollModule, BrowserAnimationsModule, HttpClientModule, DialogModule, CommonModule, TabViewModule, CodeHighlighterModule, ButtonModule,
    InputTextModule, ReactiveFormsModule, FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
