import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  username = '';
  error: {name: string, message: string} = {name: '', message: ''};


  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }


  onSignUp(): void {
    this.clearErrorMessage()
 
    if (this.email, this.password, this.username) {
      this.authService.signUpWithEmail(this.email, this.password, this.username)
        .then(() => {
          this.router.navigate(['/home'])
        })
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }


  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/home']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

 validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!'
      return false
    }
 
    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!'
      return false
    }
 
    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      return false
    }
 
    this.errorMessage = ''
 
    return true
  }
 
  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
 
    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }
 
    return true;
  }

}
