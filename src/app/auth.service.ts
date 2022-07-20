import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem('access_token')
    window.sessionStorage.setItem('access_token', token)

  }

  public getToken(){
    return sessionStorage.getItem('access_token')
  }

  public saveUser(user: any){
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any{
    return JSON.parse(String(sessionStorage.getItem('user')))
  }
}
