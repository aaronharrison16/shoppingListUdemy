import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    ).pipe(catchError(errorRes => {
      let errorMessage = "An unknown error occurred";
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "This email is already registered";
        
      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3WrzYCOGEP2Tar0MDElhOPm_6oo22_AY",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = "An unknown error occurred";
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid email or password';
          break
        case "EMAIL_NOT_FOUND":
          errorMessage = "Invalid email or password";
         
      }
      return throwError(errorMessage);
    })); 
  }
}