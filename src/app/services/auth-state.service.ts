import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';

const USER_DATA_KEY = "USER_DATA";

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);

  userAuthState = this.userState.asObservable();

  constructor(public token: TokenService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_DATA_KEY);
    window.sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_DATA_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
