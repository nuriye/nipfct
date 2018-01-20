import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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


}
