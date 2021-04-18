import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Router} from '@angular/router';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {NotificationService} from './notification.service';

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
  favourite_categories: string[];
  role: 'ADMIN' | 'MEMBER';
}



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userData: Observable<firebase.User>;
    authState: Observable<firebase.User>;
    token: Observable<string>;
    redirectUrl: string;

    // private isAdmin = new BehaviorSubject<User['role']>('MEMBER');
    // isAdmin$ = this.isAdmin.asObservable().pipe(
    //     map(role => role === 'ADMIN')
    // );

    constructor(private angularFireAuth: AngularFireAuth,
                private router: Router,
                private httpService: HttpService,
                private notificationService: NotificationService) {
        this.userData = angularFireAuth.user;
        this.authState = angularFireAuth.authState;
        this.token = this.angularFireAuth.idToken;
    }

    login() {
        this.GoogleAuth();
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.angularFireAuth.signInWithPopup(provider)
            .then((result) => {
                this.loginUser(result).subscribe(({user, nextUserAction}) => {
                    // this.setUserRole(user.role);
                    if (nextUserAction === 'NEW_USER') {
                        this.router.navigate(['/', 'onboarding']);
                        this.redirectUrl = null;
                    } else if (nextUserAction === 'EXISTING_USER') {
                        if (this.redirectUrl) {
                            this.router.navigateByUrl(this.redirectUrl);
                            this.redirectUrl = null;
                        } else {
                            this.router.navigate(['u']);
                        }
                    }
                }, error => {
                    console.error(error);
                    this.notificationService.show('Failed to login. Try again later!');
                    this.signOut();
                });
            }).catch((error) => {
                console.error(error);
                this.notificationService.show('Failed to login. Try again later!');
                this.signOut();
            });
    }

    signOut() {
        return this.angularFireAuth.signOut().finally(() => {
            this.router.navigate(['']);
        });
    }

    loginUser(result) {
        const {additionalUserInfo: {profile}} = result;
        const {
            name: displayName,
            email: email,
            given_name: firstName,
            family_name: lastName
        } = profile as any;

        return this.httpService.post<{ user: User, nextUserAction: 'NEW_USER' | 'EXISTING_USER' }>('user/login', {
            userId:11,
            displayName,
            email,
            firstName,
            lastName
        });
    }

    // setUserRole(r: User['role']) {
    //     this.isAdmin.next(r);
    // }

    loginOrDashboard() {
        this.userData.subscribe(u => {
            if (!u) {
                this.login();
            } else {
                this.router.navigate(['/u', 'dashboard']);
            }
        });
    }
}
