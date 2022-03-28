import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InternModule } from './modules/intern/intern.module';
import { HomeComponent } from './home/home.component';
import { AddInternComponent } from './add-intern/add-intern.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AddInternComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InternModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
