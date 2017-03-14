import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from "./login/login.component";

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent }
]

export const routing = RouterModule.forRoot(APP_ROUTES)