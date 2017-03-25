import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ManagementModule } from './management/management.module';
import { LoginService } from './login/login.service';
import { ContactService } from './contact/contact.service';
import { routing } from './app.routing';
import { UserComponent } from './management/user/user.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./login/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ManagementModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthGuard, ContactService, LoginService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
