import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'management', loadChildren: "app/management/management.module#ManagementModule" },
    { path: '**', redirectTo: '', pathMatch: 'full'}
]

export const routing = RouterModule.forRoot(APP_ROUTES)