import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { HttpClientModule } from '@angular/common/http'
import {
    BrowserAnimationsModule,
} from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'

@NgModule({
    declarations: [AppComponent, HomeComponent, AboutComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
