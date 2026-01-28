import { Routes } from '@angular/router';
import {ChatInterfaceComponent} from './chat-interface/chat-interface';

export const routes: Routes = [
    {path:'', redirectTo:'chat', pathMatch: 'full'},
    {path:'chat', component: ChatInterfaceComponent}
];
