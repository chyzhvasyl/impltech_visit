import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import {BootstrapOptions} from "../../node_modules/@angular/core/src/application_ref";
import { ParallaxDirective } from './components/parallax.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ParallaxDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
