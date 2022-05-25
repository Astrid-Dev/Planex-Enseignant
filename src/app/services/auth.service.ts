import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { LoginTeacher } from "../models/LoginTeacher";
import {environment} from 'src/environments/environment';
import {TokenService} from "./token.service";
import {AuthStateService} from "./auth-state.service";

const LOGIN_URL = environment.AUTH_URL + "/login";
const LOGOUT_URL = environment.BACKEND_URL + "/logout";
// const USER_PROFILE_URL = environment.BACKEND_URL + "users"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService, private authStateService: AuthStateService) { }

  login(userData: LoginTeacher)
  {
    return new Promise((resolve, reject) => {
      this.http.post(LOGIN_URL, userData)
        .subscribe(
          (res) =>{
            resolve(res);
          },
          (err) =>{
            reject(err);
          }
        )
    });
  }

  logout()
  {
    return new Promise((resolve, reject) => {
      this.http.post(LOGOUT_URL, null)
        .subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
    });
  }

  perfomLogOut()
  {
    this.authStateService.setAuthState(false);
    this.tokenService.removeToken();
  }

  // updateUserProfile(newUserData: any, userId: number)
  // {
  //   return new Promise(((resolve, reject) => {
  //     this.http.put(USER_PROFILE_URL+"/"+userId, newUserData)
  //       .subscribe(
  //         res =>{
  //           resolve(res);
  //         },
  //         err =>{
  //           reject(err);
  //         }
  //       )
  //   }))
  // }
}
