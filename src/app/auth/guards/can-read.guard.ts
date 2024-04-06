import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const canReadGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);

  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user && authService.canRead(user)) {
        return true; // If user is canRead, allow access
      } else {
        // If user is not canRead, navigate to login and deny access
        console.log('access denied')
        router.navigate(['login'])
          .catch(error => console.log(error));
        return false;
      }
    }),
    catchError(() => {
      // Handle errors
      router.navigate([''])
        .catch(error => console.log(error));
      return of(false);
    })
  );
};
