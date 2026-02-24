// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../login/service/login-service';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = loginService.getTokenSesion();

  if (token) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};