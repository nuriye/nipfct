import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gamesRef: AngularFireList<any>;
  allGames: Observable<any[]>;

  playersRef: AngularFireList<any>;
  allPlayers: Observable<any[]>;




  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, public authService: AuthService, private router: Router) { 
      

      this.gamesRef = db.list('/games');
        this.allGames = this.gamesRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
        }));
      });




/*
this.gamesRef = db.list('/games');
    this.allGames = this.gamesRef.snapshotChanges().map(changes => {
        return changes.map(c => { 
          let games;
          //games.key= c.payload.key;
          //games.satus = c.payload.val().status;
          games.time = c.payload.val().time;

          let players=[]
          c.payload.val().players.forEach(player=>{
            players.push(player);
          })

          games.players = players;

          return games;
    });
});
*/



      //this.allUsers = db.list('/users');

      //console.log(this.allGames);
/*
                                        var gamesRef = firebase.database().ref("games").orderByKey();
                                        gamesRef.once("value")
                                        .then(function(snapshot) {
                                          snapshot.forEach(function(childSnapshot) {
                                            var key = childSnapshot.key;
                                            var childData = childSnapshot.val();
                                        });
                                      });
*/

    }

  ngOnInit() {


    
  }

  deleteOneGame(e) {
    firebase.database().ref("/games/" + e).remove();
  }

  changeGameStatus(e, status) {
    var statusRef = firebase.database().ref("/games/" + e);
    if(status === 'inactive') {
      status = 'active';
    }
    else {
      status = 'inactive';
    }
    statusRef.update({
      status: status
    })
  }

  Myhack(val) {
    //console.log(val);
}


getPlayers(e) {
  /*this.gamesRef = this.db.list('/games/' + '-L3iS0TTOKt_Fa1v9VS8' + '/players/');
  this.allPlayers = this.gamesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
  }));
});*/

console.log(firebase.database().ref('/games/'));
}

}
