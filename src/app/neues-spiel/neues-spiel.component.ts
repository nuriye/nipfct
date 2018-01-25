import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
//import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-neues-spiel',
  templateUrl: './neues-spiel.component.html',
  styleUrls: ['./neues-spiel.component.scss']
})



export class NeuesSpielComponent implements OnInit {

  parentMessage = "message from parent";

  isSelected = '';

  email = '';

  myUsers = new Array();

  addedUsers = new Set([]);

  timest: number;



  //allUsers: FirebaseListObservable<any[]>;

  userRef: AngularFireList<any>;
  allUsers: Observable<any[]>;

  //allUsers: UsersInGame[] = [];

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) {

      this.userRef = db.list('/users');
      this.allUsers = this.userRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }));

     });

    // console.log(this.myUsers);

      //this.allUsers = db.list('/users');

      /*
      /*  
    courseRef: AngularFireList<any>;
    courses$: Observable<any[]>;
  
    constructor(private db: AngularFireDatabase) {
      this.courseRef = db.list('/courses');
      this.courses$ = this.courseRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }));
     });
    }
    */


      /*query = firebase.database().ref('users').orderByKey();
            query.once("value")
            .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              var userkey = key;
              var allUsernames = childSnapshot.child("username").val();
              console.log(allUsernames, userkey);
          
        /*    this.myUsers.push({
                id: userkey,
                username: allUsernames
              });*/
/*
          });

        });*/

     
    }



  ngOnInit() {

  }

  isChecked(e) {

        if(this.addedUsers.has(e)) {
          this.addedUsers.delete(e); 
        } else {
          this.addedUsers.add(e);
        }

    }

    

    addNewGame() {
        var today = new Date();
        var d = today.getDate();
        var mo = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var min;
        var hh;
        var dd;
        var mm;

        if(m == 0 || m < 10 ) { //statt 1 01 und statt 0 00 usw
          min = "0" + m;
        } else {
          min = m;
        }

        if(h == 0 || h < 10 ) { //statt 1 01 und statt 0 00 usw
          hh = "0" + h;
        } else {
          hh = h;
        }

        if(mo == 0 || mo < 10 ) { //statt 1 01 und statt 0 00 usw
          mm = "0" + mo;
        } else {
          mm = mo;
        }

        if(d == 0 || d < 10 ) { //statt 1 01 und statt 0 00 usw
          dd = "0" + d;
        } else {
          dd = d;
        }


        var newGameRef = firebase.database().ref("games").push({
            date: dd + "." + mm + "." + yyyy,
            time: hh + ":" + min,
            status: "active"
          });

          var gameRef = newGameRef.key;
          this.addedUsers.forEach((user: string) => {
                var gameUsersRef = firebase.database().ref("games/" + gameRef).child("players").child(user).set({
                    reihenfolge: 0,
                    isMaster: false,
                    username: user
                });
          });

          this.router.navigate(['/home']);
          

    }


  }













 

  





