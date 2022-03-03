import { Injectable } from '@angular/core';
import { Router, CanActivate, Route } from '@angular/router';
import { AuthService } from '@core/services/authentication/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  permiso: any = {};

  constructor(
    private router: Router,
    private service: AuthService,
  ) {
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate(): boolean {

    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
