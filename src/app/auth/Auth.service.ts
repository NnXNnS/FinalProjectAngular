import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Injectable()
export class AuthService {
  constructor(private myRoute: Router) { }
  sendToken(token: any) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate(["login"]);
  }
  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("LoggedInUser"));
    }
    catch (Error) {
      return null;
    }
  }
}