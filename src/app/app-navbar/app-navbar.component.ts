import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

  

}
