import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-add-answer-master',
  templateUrl: './add-answer-master.component.html',
  styleUrls: ['./add-answer-master.component.scss'],
})



export class AddAnswerMasterComponent implements OnInit {


  answer='';
  uid ='';
  username='';
  actualNumberOfPlayers;
  numberOfPlayers;
  letter='';
  randomNumber;

  answersRef: AngularFireList<any>;
  allAnswers: Observable<any[]>;

  //numberPlayers: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) { 

      this.answersRef = db.list('aktuelles-spiel/answers');
      this.allAnswers = this.answersRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     });

     //var numberPlayers = db.ref('aktuelles-spiel/answers');

     var numberPlayers = firebase.database().ref("aktuelles-spiel").child("numberofplayers");

     numberPlayers.on("value", function(snapshot) {
      var thenumber = snapshot.val();
      document.getElementById("number").innerHTML = thenumber;
    });

/*
    var userDataRef = firebase.database().ref("UserData").orderByKey();
userDataRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();              // childData will be the actual contents of the child

      var name_val = childSnapshot.val().Name;
      var id_val = childSnapshot.val().AssignedID;
     // document.getElementById("name").innerHTML = name_val;

  });
 });
*/

    
     


    }
    ngOnInit() {
    }

  addAnswer() :void {

    if(this.answer) {
      this.uid = this.afAuth.auth.currentUser.uid;
      this.username = this.afAuth.auth.currentUser.displayName;
      this.answer = this.answer;
      this.randomNumber = Math.floor(Math.random()*1000);

      var answersRef = firebase.database().ref("aktuelles-spiel/answers");


      answersRef.push().set({
          uid: this.uid,
          username: this.username,
          answer: this.answer,
          master: "master",
          number: this.randomNumber
        }).then(() => {
          this.answer = ''; 
          document.getElementById("answer-not-sent").style.display="none";
          document.getElementById("answer-sent").style.display="block";
        }).catch(error => {
          document.getElementById("answer-not-sent").style.display="block";
          console.log(error);
        });   
        
    }
  }

  openDiv() {
    document.getElementById("reallyDelete").style.display="initial";
    window.scrollTo(0, 0);
  }
  closeDiv() {
    document.getElementById("reallyDelete").style.display="none";
  }

  deleteAllAnswers() :void {
    var answersRef = firebase.database().ref("answers");
    answersRef.set({     
      });
      document.getElementById("reallyDelete").style.display="none";
  }

  deleteOneAnswer(e) {
    firebase.database().ref("aktuelles-spiel/answers/" + e).remove();

  }

  saveNumberOfPlayers() {
    var answersRef = firebase.database().ref("aktuelles-spiel/");
    answersRef.update({
        numberofplayers: this.numberOfPlayers
      })
  }


}

