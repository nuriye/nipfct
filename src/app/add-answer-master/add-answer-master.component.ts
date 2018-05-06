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

     /*var numberPlayers = firebase.database().ref("aktuelles-spiel").child("numberofplayers");

     numberPlayers.on("value", function(snapshot) {
      var thenumber = snapshot.val();
      document.getElementById("number").innerHTML = thenumber;
    });*/

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


    ngOnInit() {}

  addAnswer() :void {

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
        
        usersRef.child(this.uid).child('answers').push().set({
          username: this.username,
          answer: this.answer,
          master: "master",
        })
        
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


 
  shuffleAnswers() :void {
    var answersRef = firebase.database().ref("aktuelles-spiel/answers");
    var shuffledAnswersRef = firebase.database().ref("aktuelles-spiel/shuffled");
    var allAnswers = [];

          /* Erst die Shuffled Answers leeren */
          shuffledAnswersRef.set({     
          });
    

    answersRef.once('value', function(snapshot) {


      /* Alle answers in Array und shufflen*/
      var allAnswersShuffled = snapshotToArray(snapshot);


      /* Alle geshuffelten Answers in vorübergehende Firebase speichern */
          allAnswersShuffled.forEach(function(oneAnswer) {
            var randomNumber = Math.floor(Math.random()*1000);
            //console.log(oneAnswer.answer);
            shuffledAnswersRef.push().set({
              uid: oneAnswer.uid,
              username: oneAnswer.username,
              answer: oneAnswer.answer,
              master: oneAnswer.master,
              number: randomNumber
            });

            /* wenn gespeichert, dann genau die answer auf firebase löschen */
            var keyy = oneAnswer.key;

            /* Alle Ungeshuffelten answers von answers firebase löschen */
            answersRef.child(keyy).set({     
            });

         

       });

        /* und nund alle answers wieder in answers firebase speichern */
        allAnswersShuffled.forEach(function(oneAnswer) {
          var randomNumber = Math.floor(Math.random()*1000);
         // console.log(oneAnswer.answer);
          answersRef.push().set({
            uid: oneAnswer.uid,
            username: oneAnswer.username,
            answer: oneAnswer.answer,
            master: oneAnswer.master,
            number: randomNumber
          });
      });

      shuffledAnswersRef.set({     
      });


          function snapshotToArray(snapshot) {
            var allAnswers = [];

            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;

                allAnswers.push(item);
            });

            return shuffle(allAnswers);
          }


          function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
          }



  /*answersRef.once("value").then(function(questionsSnapshot) {
      return questionsSnapshot.forEach(function(questionSnapshot) {*/
       // JSON.parse( JSON.stringify(questionSnapshot ) );
       /*answersRef.push().set({
          uid: questionSnapshot.child('uid').val(),
          username: questionSnapshot.child('username').val(),
          answer: questionSnapshot.child('answer').val(),
          master: questionSnapshot.child('master').val(),
          number: 4
        })*/
        //return console.log(questionSnapshot.val());
        //return console.log(questionSnapshot.child('username').val());
     /* });
    });*/

 
  });

}




  }



