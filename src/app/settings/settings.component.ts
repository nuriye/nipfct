import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  //uid = this.afAuth.auth.currentUser.uid;

  uid = this.afAuth.auth.currentUser.uid;
  answersRef: AngularFireList<any>;
  allMyAnswers: Observable<any[]>;


  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) { 


     /* this.afAuth.auth.onAuthStateChanged(auth => {
        if (auth) {
          console.log(this.uid);
          this.uid = this.afAuth.auth.currentUser.uid
        } else {
          this.router.navigate(['/']);
          console.log('User not logged in');
        }
      });*/

      //this.uid = this.afAuth.auth.currentUser.uid;
      //console.log(this.uid);
      var path = 'users/' + this.uid + '/answers';

      this.answersRef = db.list(path);
      this.allMyAnswers = this.answersRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     });
     


  }

  ngOnInit() {}


  deleteOneAnswer(e) {
    var uid = this.uid;
    firebase.database().ref("users/" + uid + '/answers/' + e).remove();
  }

}
