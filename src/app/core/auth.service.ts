import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
/*import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';*/
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
@Injectable()
export class AuthService {


  authState: any = null;
  
  
  user: Observable<User>;
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
  

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserName(): string {
    return this.authState['email']
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



  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
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

  


}