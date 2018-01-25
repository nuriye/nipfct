import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {


  //displayUsername: Observable<any>;


  constructor(public authService: AuthService, 
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(auth => {
      if (auth) {
        //console.log(auth);
      } else {
        this.router.navigate(['/']);
        console.log('User not logged in');
      }
    });

     }

  logout() {
    this.authService.signOut();
  }


  /*displayUsername = this.db.list('users', ref => ref.orderByChild('userid').equalTo(this.userId)).snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
 });*/






  

}
