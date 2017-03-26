import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { management_routing } from './management.routing';
import { UserComponent } from './user/user.component';
import { ManagementService } from './management.service';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ManagementComponent } from './management.component';

@NgModule({
  declarations: [
    UserAddComponent,
    UserEditComponent,
    ManagementComponent,
    UserComponent,
  ],
  imports: [BrowserModule, FormsModule, CommonModule, management_routing],
  providers: [ManagementService]
})

export class ManagementModule {}