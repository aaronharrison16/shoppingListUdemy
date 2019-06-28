import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string, 
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: "root"})
export class AuthService {
  
  constructor(private http: HttpClient) {}
    
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC3WrzYCOGEP2Tar0MDElhOPm_6oo22_AY", 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError)); 
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3WrzYCOGEP2Tar0MDElhOPm_6oo22_AY",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError)); 
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email or password';
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Invalid email or password";
        break;
      case "EMAIL_EXISTS":
        errorMessage = "This email is already registered.";
        break;
    }
    
    return throwError(errorMessage);
  } 
}