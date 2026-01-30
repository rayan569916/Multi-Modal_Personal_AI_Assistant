import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from './../config/config';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';
    private userKey = 'auth_user';

    constructor(private http: HttpClient, private router: Router) { }

    register(credentials: any): Observable<any> {
        return this.http.post(`${BaseURL}/auth/register`, credentials);
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${BaseURL}/auth/login`, credentials).pipe(
            tap((response: any) => {
                if (response && response.access_token) {
                    localStorage.setItem(this.tokenKey, response.access_token);
                    localStorage.setItem(this.userKey, response.username);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getUsername(): string | null {
        return localStorage.getItem(this.userKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
