import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MesagesService } from '../mesages.service';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private usersService: UsersService, private messageService: MesagesService){ }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.usersService.isLoggedIn){
        return true
      }
      
      this.router.navigate(['/login'])
      this.messageService.add('Unauthorized: redirected to login');
      return false
  }
  
}
