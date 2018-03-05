import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { routing} from './app.routes';
import { RouterModule, Routes } from '@angular/router';
import { AuthService} from './shared/auth/auth.service';
import {AngularFireModule} from 'angularfire2';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

var config = {
    apiKey: "AIzaSyAjIrIJJl1Gp6C4v1-KbwoqvEbLXIWyK58",
    authDomain: "khori-3a84d.firebaseapp.com",
    databaseURL: "https://khori-3a84d.firebaseio.com",
    projectId: "khori-3a84d",
    storageBucket: "khori-3a84d.appspot.com",
    messagingSenderId: "441055602065"
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(config),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService,AngularFireAuth,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
