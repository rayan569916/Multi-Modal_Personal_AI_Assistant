import { Routes } from '@angular/router';
import { ChatInterfaceComponent } from './chat-interface/chat-interface';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },
    { path: 'chat', component: ChatInterfaceComponent }
];
