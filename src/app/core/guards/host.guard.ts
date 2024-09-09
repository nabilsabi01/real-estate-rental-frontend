import { CanActivateFn } from '@angular/router';

export const hostGuard: CanActivateFn = (route, state) => {
  return true;
};
