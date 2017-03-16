import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from "./login/login.component";

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES)