import { LoginService } from './login/login.service';
import { ContactService } from './contact/contact.service';
import { routing } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserComponent } from './management/user/user.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "./login/auth.guard";
import { ManagementComponent } from './management/management.component';
import { TeamComponent } from './management/team/team.component';
import { TeamAddComponent } from './management/team/team-add/team-add.component';
import { TeamEditComponent } from './management/team/team-edit/team-edit.component';
import { UserAddComponent } from './management/user/user-add/user-add.component';
import { UserEditComponent } from './management/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    HomeComponent,
    UserComponent,
    ManagementComponent,
    TeamComponent,
    TeamAddComponent,
    TeamEditComponent,
    UserAddComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthGuard, ContactService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
