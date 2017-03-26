import { AuthGuard } from './../login/auth.guard';
import { Routes, RouterModule } from '@angular/router'

import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { ManagementComponent } from './management.component';

export const MANAGEMENT_ROUTES: Routes = [
    { path: 'management', component: ManagementComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            { path: 'user', component: UserComponent },
            { path: 'add-user', component: UserAddComponent },
            { path: 'edit-user', component: UserEditComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ] },
]

export const management_routing = RouterModule.forChild(MANAGEMENT_ROUTES)