import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/athentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }
  //
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
  //   if (!this.authService.isAuthenticated) {
  //     this.router.navigate(['login'], {queryParams : {requested : state.url}});
  //   }
  //   return this.authService.isAuthenticated;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        console.log(currentUser.role + 'fail in ' + route.data.roles);
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }

    console.log('Need log in');
    // not logged in so redirect to login page with the return url{queryParams: {returnUrl: state.url}}
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
