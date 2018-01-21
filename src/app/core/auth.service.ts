import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

export class User {
  uid: string;
  username: string = "";
  constructor(auth) {
    this.uid = auth.uid
  }
}

@Injectable()
export class AuthService {


  authState: any = null;
  currentUser: Observable<User>;
  //currentUser: User;
  
  //user: Observable<User>;
  //currentUser: Observable<User>;
  /*
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }
  */
  
/*
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  */

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, private router: Router) {

      this.currentUser = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          // logged in, get custom user from Firestore
          return this.currentUser.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          // logged out, null
          return Observable.of(null)
        }
      })


    /*this.afAuth.authState.switchMap(auth => {
        if (auth) {
          this.currentUser = new User(auth)
          return this.db.object(`/users/${auth.uid}`)
        } else return [];
      })
      .subscribe(user => {
          this.currentUser['username'] = user.username
      })*/
   }

   get currentUsername(): string {
    return this.authState['displayName']
  }

/*
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserEmail(): string {
    return this.authState['email']
  }

  get currentUsername(): string {
    return this.authState['displayName']
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null)) {
      return true
    } else {
      return false
    }
  }
  */

  signUpWithEmail(email: string, password: string, username: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({
          displayName : username
      });
      this.authState = user
      this.db.object(`/users/${this.currentUser.uid}`).update({"username": username})
      this.isLoggedIn()  
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.isLoggedIn()
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  isLoggedIn() {
    this.afAuth.auth.onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth);
      } else {
        console.log('User logged out');
      }
    });
  }




  


}