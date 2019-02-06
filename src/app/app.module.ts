import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainService } from './service/main.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';

const config = {
  apiKey: "AIzaSyAVDRplTYtEnbhSic154CezUkIS2pOFXoQ",
  authDomain: "phonebook-1d172.firebaseapp.com",
  databaseURL: "https://phonebook-1d172.firebaseio.com",
  projectId: "phonebook-1d172",
  storageBucket: "phonebook-1d172.appspot.com",
  messagingSenderId: "635811077861"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    BoardComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,

    NgxSpinnerModule,
  ],
  providers: [MainService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

