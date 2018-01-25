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

  answersRef: AngularFireList<any>;
  allAnswers: Observable<any[]>;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) { 

      this.answersRef = db.list('/answers');
      this.allAnswers = this.answersRef.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
      }));

     });

    }
    ngOnInit() {
    }

  addAnswer() :void {

    if(this.answer) {
      this.uid = this.afAuth.auth.currentUser.uid;
      this.username = this.afAuth.auth.currentUser.displayName;
      this.answer = this.answer;

      var answersRef = firebase.database().ref("answers");


      answersRef.push().set({
          uid: this.uid,
          username: this.username,
          answer: this.answer
        }).then(() => {
          this.answer = ''; 
          document.getElementById("answer-not-sent").style.display="none";
          document.getElementById("answer-sent").style.display="block";
        }).catch(error => {
          document.getElementById("answer-not-sent").style.display="block";
          console.log(error);
        });
       // document.getElementById("answer-input").innerHTML="hello";
  

        

        
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

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }

}
