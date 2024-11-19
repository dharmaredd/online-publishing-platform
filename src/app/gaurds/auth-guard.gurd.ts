import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLogin = localStorage.getItem('isLogin');
  return isLogin ? true : router.createUrlTree(['/login']);
};
