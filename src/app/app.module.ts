import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import { HttpClientModule } from '@angular/common/http'
import {
    BrowserAnimationsModule,
} from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { AppRoutingModule } from './app-routing.module'
import { CsvTableComponent } from './csv-table/csv-table.component'

@NgModule({
    declarations: [AppComponent, HomeComponent, AboutComponent, CsvTableComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
        MatTableModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
