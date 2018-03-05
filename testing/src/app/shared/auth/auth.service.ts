import { Injectable } from '@angular/core';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router'

@Injectable()
export class AuthService {
  authstate:any = null;
  constructor(private afAuth:AngularFireAuth,
             private afDatabase:AngularFireDatabase,
             private router:Router)
      {
            this.afAuth.authState.subscribe((auth)=>
              {
                this.authstate = auth;
              });
      }

      get authenticated(): boolean {
       return this.authstate !== null;
     }


     get currentUserId(): string {
    return this.authenticated ? this.authstate.uid : '';
  }

    emailSignUp(email:string,password:string,userName:string)
    {
      this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((user)=>
      {
        this.authstate = user;
        this.updateUserData(userName);
      }).catch((error)=>{
        console.log(error);
      })
      console.log(email);
    }

    private updateUserData(userName:string)
    {
       const path =  `users/${this.currentUserId}`;
       const data = {
         username: userName,
         email:this.authstate.email,
         
       }
       this.afDatabase.object(path).update(data).catch((error)=>
       {
         console.log(error);
       })
    }

}
