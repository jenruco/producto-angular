import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../../login/service/login-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem('token');
  const loginService = inject(LoginService);
  const token = loginService.getTokenSesion();
  
  if(token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }
  
  return next(req);
};
