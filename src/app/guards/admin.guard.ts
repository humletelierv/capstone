import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const loggedInUser = await this.authService.getLoggedInUser();
    if (loggedInUser) {
      const userData = await this.authService.getUserDetails(loggedInUser.id);
      if (userData.role === 'admin') {
        return true;
      }
    }

    // Redirigir al home si no es admin
    this.router.navigate(['/login']);
    return false;
  }


}
