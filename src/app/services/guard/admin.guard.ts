import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    let isAdmin = this.userService.user?.role === 'ADMIN';

    if (this.authService.isAuthenticated() && isAdmin) {
      return true;
    } else {
      this.router.navigate(['/acesso-negado']);
      return false;
    }
  }
}
