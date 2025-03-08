import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, signal } from "@angular/core";
import { createUser } from "../models/user.model";
import { UserStorage } from "../models/user-storage.model";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../components/snackbar/snackbar.component";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient)
    private router = inject(Router)
    private userInfo = signal<UserStorage | null>(this.loadUserFromLocalStorage()) // Inicializa com os dados do localStorage
    private urlApi = environment.urlApi

    constructor(){
        effect(() => {
            this.syncUserInfoWithLocalStorage()
        })
    }

    createUserObserVable(user: createUser){
        return this.http.post(`${this.urlApi}/users`, user).subscribe({
            next: (response: any) => {
                console.log('Response:', response)

                if(!response){
                    return console.log("DEU MERDA", response)
                }else{
                    this.router.navigateByUrl('/login')
                    console.log("DEU CERTO")
                }
            },
            error: (error: any) => {
                console.log('Error:', error)
                this.openSnackBar(error.error.error)
            }
        })
    }

    loginUser(user: { email: string, password: string }): Observable<any> {
        return this.http.post(`${this.urlApi}/auth/login`, user)
    }

    syncUserInfoWithLocalStorage() {
        if (this.userInfo()) {
            localStorage.setItem('UserData', JSON.stringify(this.userInfo()))
        } else {
            localStorage.removeItem('UserData')
        }
    }

    setCurrentUser(user: UserStorage) {
        this.userInfo.set(user)
    }

    getUserInfo() {
        return this.userInfo.asReadonly()
    }

    isUserLogged() {
        return !!this.userInfo()
    }

    private loadUserFromLocalStorage(): UserStorage | null {
        const storedUser = localStorage.getItem('UserData')
        return storedUser ? JSON.parse(storedUser) : null
    }

    private _snackBar = inject(MatSnackBar);
    
    durationInSeconds = 5;
    
    openSnackBar(message: string) {
        this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            data: {message},
        });
    }
}
