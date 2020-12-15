import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private checkAuthenticated = false;

  constructor(public router: Router) {
  }

  canActivate() {
    if (!this.checkAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  validAuthenticated() {
    this.checkAuthenticated = true;
  }
}
