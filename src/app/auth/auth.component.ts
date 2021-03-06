import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: "app-auth",
  templateUrl:"./auth.component.html"
})


export class AuthComponent {
  constructor( private authService: AuthService ) {}
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;
    
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signup(email, password)
    }
    
    authObservable.subscribe(
      responeseData => {
        console.log(responeseData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}