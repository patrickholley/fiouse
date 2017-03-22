import { TeamComponent } from './management/team/team.component';
import { TeamEditComponent } from './management/team/team-edit/team-edit.component';
import { TeamAddComponent } from './management/team/team-add/team-add.component';
import { UserAddComponent } from './management/user/user-add/user-add.component';
import { UserEditComponent } from './management/user/user-edit/user-edit.component';
import { UserComponent } from './management/user/user.component';
import { ManagementComponent } from './management/management.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'management', component: ManagementComponent, canActivate: [AuthGuard],
        children: [
            { path: 'team', component: TeamComponent, children: [
                { path: 'add', component: TeamAddComponent },
                { path: 'edit', component: TeamEditComponent },
                { path: '**', redirectTo: '', pathMatch: 'full' }
            ] },
            { path: 'user', component: UserComponent, children: [
                { path: 'add', component: UserAddComponent },
                { path: 'edit', component: UserEditComponent },
                { path: '**', redirectTo: '', pathMatch: 'full' }
            ] },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ] },
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
]

export const routing = RouterModule.forRoot(APP_ROUTES)