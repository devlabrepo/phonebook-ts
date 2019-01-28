import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';



const appRoutes: Routes = [
  {
      path: "contacts",
      component: ContactsComponent, 
    //  canActivate: [AuthGuardService],
  },
  {
    path: "home",
    component: HomeComponent, 
  //  canActivate: [AuthGuardService],
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), CommonModule], 
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule  { }
