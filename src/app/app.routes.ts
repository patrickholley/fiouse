import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
]

export const routing = RouterModule.forRoot(APP_ROUTES)