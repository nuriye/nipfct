import { Component, OnInit } from '@angular/core';
//import { AuthGuard } from '../core/auth.guard';
import { CanActivate } from "@angular/router";
import {AuthService} from '../core/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

}
