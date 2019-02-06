import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private isLogged = new Subject<boolean>();

  constructor(private angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    })
  }

  login(login: string, password: string) {
    console.log(login, password);
    this.angularFire.auth.signInWithEmailAndPassword(login, password)
      .then(user => {
      //  console.log(user.user.refreshToken);

        if(user) {
          this.isLogged.next(true);
          this.router.navigateByUrl("/contacts");
        }
      })
      .catch(error => { console.log(error); });
  }

  logout() {
    this.angularFire.auth.signOut()
      .then(status => {
        this.isLogged.next(false);
        this.router.navigateByUrl("/home")
      })
      .catch( error => {this.isLogged.next(false); console.warn(error)})
  }

  signup(login: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(login, password)
      .then(v => {
      }).catch(e => { });
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLogged.asObservable();
  }


}
