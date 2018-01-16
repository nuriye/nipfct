import { Component, OnInit } from '@angular/core';
//import { AuthGuard } from '../core/auth.guard';
import { CanActivate } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
