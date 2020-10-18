import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

interface UserAuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserAuthSerivce {
    user = new BehaviorSubject<User>(undefined);

    constructor(private http: HttpClient,
                private router: Router) { }

    singup(email: string, password: string) {
        return this.http.post<UserAuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcHbIm1OZCggxf_6IKpFq38KEzZ77nWBE',
            {
                email,
                password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError),
              tap(resData => {
                this.handleUserAuth(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);
            })
        );

    }

    login(email: string, password: string) {
        return this.http
        .post<UserAuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcHbIm1OZCggxf_6IKpFq38KEzZ77nWBE',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
        .pipe(catchError(this.handleError),
              tap(resData => {
                this.handleUserAuth(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);

            })
        );

    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
    }

    private handleUserAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(
                email,
                userId,
                token,
                expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknow error occured!';
        if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
        switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists!';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exists!';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'This password is not valid!';
                        break;
                }
        return throwError(errorMessage);
    }

}
