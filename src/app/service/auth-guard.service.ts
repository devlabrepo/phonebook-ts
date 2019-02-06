import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) {

    this.auth.getLoginStatus().subscribe((flag: boolean) => { this.isLoggedIn = flag; console.log(this.isLoggedIn) });

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn;
  }
}
