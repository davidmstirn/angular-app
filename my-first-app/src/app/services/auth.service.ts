import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC19q4eV4sX6VSk7GJIZtNuTrSfeLSAoFk",
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
      tap(this.handleAuthentication)
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC19q4eV4sX6VSk7GJIZtNuTrSfeLSAoFk",
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
      tap(this.handleAuthentication.bind(this))
    );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData"));
    if(userData) {
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if(loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(res: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +res.expiresIn*1000)
    const user = new User(res.email, res.localId, res.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+res.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if(!errorRes?.error?.error?.message) {
      return throwError(() => errorMessage);
    }

    switch(errorRes.error.error.message) {
      // Signup Errors
      case "EMAIL_EXISTS":
        errorMessage = "This email is not available";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "Signup not allowed";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "Try again later";
        break;

      // Login Errors
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Invalid login credentials";
        break;
      case "USER_DISABLED":
        errorMessage = "User disabled";
        break;
    }

    return throwError(() => errorMessage);
  }
}
