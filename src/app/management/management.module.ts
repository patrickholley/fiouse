import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { management_routing } from './management.routing';
import { UserComponent } from './user/user.component';
import { ManagementService } from './management.service';
import { TeamComponent } from './team/team.component';
import { TeamAddComponent } from './team/team-add/team-add.component';
import { TeamEditComponent } from './team/team-edit/team-edit.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ManagementComponent } from './management.component';

@NgModule({
  declarations: [
    TeamComponent,
    TeamAddComponent,
    TeamEditComponent,
    UserAddComponent,
    UserEditComponent,
    ManagementComponent,
    UserComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule, management_routing],
  providers: [ManagementService]
})

export class ManagementModule { }
