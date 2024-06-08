import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { LoginData } from '../models/auth.model';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth, onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';

import {
  collection,
  collectionSnapshots,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  user$: Observable<any>;
  user: LoginData | null = null;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router
  ) {
    this.user$ = user(auth).pipe(
      switchMap((user: any | null) =>
        user
          ? (docData(doc(this.afs, 'users', user.uid)) as Observable<any>)
          : of(null)
      )
    );

    this.user$.subscribe((user) => {
      this.user = user;
      // console.log(' user', user)
    });
  }

  getOnAuthStateChanged() {
    return onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
        this.user = null;
      }
    });
  }

  // Register User
  // Register User
  async registerUser(authData: any, userData: any) {
    try {
      // Create user with email and password
      const credential = await createUserWithEmailAndPassword(
        this.auth,
        authData.email,
        authData.password
      );

      // Function to check for custom claims and handle routing
      const handleClaims = async (user: any | null) => {
        if (user) {
          try {
            // Refresh the ID token to ensure we have the latest claims
            await user.getIdToken(true);
            const idTokenResult = await user.getIdTokenResult();

            // Check if user has the isAdmin or isViewer claim
            if (
              idTokenResult.claims['isAdmin'] ||
              idTokenResult.claims['isViewer']
            ) {
              console.log('User has required claims');
              // Update user profile with display name
              await updateProfile(credential.user, {
                displayName: userData.firstName,
              });

              userData.roles = {
                [idTokenResult.claims['isAdmin'] ? 'admin' : 'viewer']: true,
              };

              await this.setUserData(credential, userData)

              // Navigate to home or another route
              await this.router.navigate(['']);
            } else {
              console.log('Required claims not set yet, retrying...');
              setTimeout(() => handleClaims(user), 2000); // Retry after 1 second
            }
          } catch (tokenError) {
            console.error('Error getting ID token:', tokenError);
          }
        }
      };

      // Initial call to handleClaims to check for claims
      handleClaims(credential.user);

      // Listen for changes in the user's authentication state and handle claims
      const unsubscribe = this.auth.onIdTokenChanged(async (user: any) => {
        if (user) {
          handleClaims(user);
          // Unsubscribe from the onIdTokenChanged listener once handled
          unsubscribe();
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  // Set Document
  async setUserData(credential: any, userData: any) {
    const data: LoginData = {
      uid: credential.user.uid,
      email: credential.user.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      roles: userData.roles,
    };

    const dbDoc = doc(this.afs, 'users', data.uid);

    await setDoc(dbDoc, data)
      .then(() => {
        console.log('Data sent - Set User Doc');
      })
      .catch((error: any) => {
        console.log('Data send ERROR - Set User Doc: ', error);
      });
  }

  // Assign roles to an ability method

  canRead(user: LoginData): boolean {
    const allowed = ['admin', 'editor', 'viewer'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: LoginData): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  adminOnly(user: LoginData): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // Determines if user has matching role

  private checkAuthorization(user: any, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  // Login
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Get Collection
  getUsers() {
    const collectionRef = collection(this.afs, 'users');
    return collectionSnapshots(collectionRef).pipe(
      map((res) =>
        res.map((data: any) => {
          // const tid = data.id;
          const docData = data.data();
          const userData = {
            uid: data.id,
            firstName: docData['firstName'],
            lastName: docData['lastName'],
          };
          return { ...userData };
        })
      )
    );
  }

  // Logout
  onLogOut() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['']).catch((error: any) => {
          console.warn(error);
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  // Reset Password
  resetPassword(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(this.auth, email)
        .then(() => {
          // Password reset email sent successfully
          console.log('Password reset email sent successfully');
          resolve(); // Resolve the Promise when successful
        })
        .catch((error: any) => {
          // Handle errors
          console.error('Error sending password reset email:', error.message);
          reject(error); // Reject the Promise with the error
        });
    });
  }
}
