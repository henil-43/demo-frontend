import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signOut(){
    window.localStorage.clear();
  }

  public saveToken(token: string){
    window.localStorage.removeItem('access_token')
    window.localStorage.setItem('access_token', token)

  }

  public getToken(){
    return localStorage.getItem('access_token')
  }

  public saveUser(user: any){
    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any{
    return JSON.parse(String(localStorage.getItem('user')))
  }
}
