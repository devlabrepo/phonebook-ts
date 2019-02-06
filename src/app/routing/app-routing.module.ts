import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';

import { ContactsComponent } from '../contacts/contacts.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuardService } from '../service/auth-guard.service';
import { CommonModule } from '@angular/common';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**/',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: HomeComponent,
        // canActivate: [AuthGuardService]
    },
    {
        path: "contacts",
        component: ContactsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "login",
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }),
        CommonModule
    ],
    exports: [RouterModule],
    bootstrap: [AppComponent]
})

export class AppRoutingModule { }