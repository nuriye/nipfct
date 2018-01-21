import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-neues-spiel',
  templateUrl: './neues-spiel.component.html',
  styleUrls: ['./neues-spiel.component.scss']
})
export class NeuesSpielComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = 'Add an Item'; 

  constructor() { }


  ngOnInit() {

  }


  /*
listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken)
        }
      })
      .catch(function(error) {
        console.log("Error listing users:", error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
*/



  listAllUsers(){
    var mydata = firebase.database().ref().child('users/');
    mydata.on('value', snap => console.log(snap.val()));
  }





}
