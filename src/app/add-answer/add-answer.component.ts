import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})



export class AddAnswerComponent implements OnInit {


  answer='';
  uid ='';
  username='';
  randomNumber;

  answersRef: AngularFireList<any>;
  allAnswers: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) { 

      this.answersRef = db.list('aktuelles-spiel/answers');
      this.allAnswers = this.answersRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }));

     });

    }
    ngOnInit() {
    }

  addAnswer() :void {

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

    if(this.answer) {
      this.uid = this.afAuth.auth.currentUser.uid;
      this.username = this.afAuth.auth.currentUser.displayName;
      this.answer = this.answer;
      this.randomNumber = Math.floor(Math.random()*1000);

      var answersRef = firebase.database().ref("aktuelles-spiel/answers");
      var usersRef = firebase.database().ref("users");


      answersRef.push().set({
          uid: this.uid,
          username: this.username,
          answer: this.answer,
          number: this.randomNumber,
          master: 'nein'
        }).then(() => {
          this.answer = ''; 
          document.getElementById("answer-not-sent").style.display="none";
          document.getElementById("answer-sent").style.display="block";
        }).catch(error => {
          document.getElementById("answer-not-sent").style.display="block";
          console.log(error);
        });
        usersRef.child(this.uid).child('answers').push().set({
          username: this.username,
          answer: this.answer,
          master: 'nein',
          date: dd + "." + mm + "." + yyyy,
          time: hh + ":" + min
        })
  

        

        
    }
  }


}
