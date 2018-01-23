import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Router } from '@angular/router';
import { UsersInGame } from '../users-in-game';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AuthService } from '../core/auth.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ChartsModule } from "ng2-charts-x";

@Component({
  selector: 'app-neues-spiel',
  templateUrl: './neues-spiel.component.html',
  styleUrls: ['./neues-spiel.component.scss']
})



export class NeuesSpielComponent implements OnInit {

  isSelected = '';

  email = '';

  myUsers = new Array();



 
  //allUsers: FirebaseListObservable<any[]>;

  userRef: AngularFireList<any>;
  allUsers$: Observable<any[]>;

  //allUsers: UsersInGame[] = [];

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) {

      this.userRef = db.list('/users');
      this.allUsers$ = this.userRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }));

     });

     console.log(this.myUsers);

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

    // wenn e schon im Array ist dann rauslöschen beim klicken
  
    var usersArray = this.myUsers;
    //this.myUsers.push(e);

    if (usersArray.length < 1) { //also leer
      usersArray.push(e);
      console.log("jupp");
    } else {
      for (var i= 0; i < this.myUsers.length; i++) {
       if (usersArray[i] == e) {
          console.log("ist im array")
         } else {
          usersArray.push(e);
         }
       }
   
      
    }

   
    console.log(this.myUsers);

    //console.log(e);
    //this.myUsers.push(e);
    //console.log(this.myUsers);

    }
   
  

  addGamers(e) {
    console.log(e);

    //this.user.gender = this.userForm.get('gender').value;

    /*
    if (this.usernameToGame) {
      console.log(this.usernameToGame)
      /*
     console.log(this.usernameToGame)
        .then(() => {
          this.router.navigate(['/home'])
        })
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
        */
    }
  }






}







 

  





