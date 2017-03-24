import { AuthGuard } from './../login/auth.guard';
import { Routes, RouterModule } from '@angular/router'

import { TeamComponent } from './team/team.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { ManagementComponent } from './management.component';

export const MANAGEMENT_ROUTES: Routes = [
    { path: 'management', component: ManagementComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            { path: 'team', component: TeamComponent },
            { path: 'add-team', component: TeamAddComponent },
            { path: 'edit-team', component: TeamEditComponent },
            { path: 'user', component: UserComponent },
            { path: 'add-user', component: UserAddComponent },
            { path: 'edit-user', component: UserEditComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ] },
]

export const management_routing = RouterModule.forChild(MANAGEMENT_ROUTES)