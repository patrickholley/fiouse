import { AuthGuard } from './../login/auth.guard';
import { Routes, RouterModule } from '@angular/router'

import { TeamComponent } from './team/team.component';
import { TeamEditComponent } from './team/team-edit/team-edit.component';
import { TeamAddComponent } from './team/team-add/team-add.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { ManagementComponent } from './management.component';

export const MANAGEMENT_ROUTES: Routes = [
    { path: 'management', component: ManagementComponent, canActivate: [AuthGuard],
        children: [
            { path: 'team', component: TeamComponent, children: [
                { path: 'add', component: TeamAddComponent },
                { path: ':id/edit', component: TeamEditComponent },
                { path: '**', redirectTo: '', pathMatch: 'full' }
            ] },
            { path: 'user', component: UserComponent, children: [
                { path: 'add', component: UserAddComponent },
                { path: ':id/edit', component: UserEditComponent },
                { path: '**', redirectTo: '', pathMatch: 'full' }
            ] },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ] },
]

export const management_routing = RouterModule.forChild(MANAGEMENT_ROUTES)