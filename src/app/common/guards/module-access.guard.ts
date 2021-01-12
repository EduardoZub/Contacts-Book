import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleAccessGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  canActivate(): boolean | Promise<boolean> {
    if (this._authService.isLoggedIn()) {
      return true;
    }
    return this._router.navigate(['login']);
  }
}
