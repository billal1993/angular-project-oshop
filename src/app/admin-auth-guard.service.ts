import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map} from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  canActivate(): Observable<boolean>{
    //we start with this user observable
    return this.auth.appUser$
   //mapping the result in boolean 
   .pipe(map(appUser => appUser.isAdmin));
  }
}
