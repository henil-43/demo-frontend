import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { MesagesService } from './mesages.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private messagingService: MesagesService) { }

  rootUrl = 'http://localhost:8000/api';

  private log(message: string){
    this.messagingService.add(`LoginService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  login(email: string, password: string): Observable<any>{
    return this.http.post(this.rootUrl + "/login", {email: email, password: password}, this.httpOptions)
    .pipe(tap((user) => this.log(`User successfully logged in`)));
  }

  signup(firstName: string, lastName: string, address: string, email:string, password: string, phoneNo: number, age: number){
    const obj = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      password: password,
      phoneNo: phoneNo,
      age: age
    }
   return this.http.post(this.rootUrl + "/signup", obj, this.httpOptions)
   .pipe(tap((user) => this.log('successfully signed up'))) 
  }

  getUsers(){
    return this.http.get(this.rootUrl + "/get-users")
    .pipe(tap((users) => this.log("fetched users!!!!")))
  }

  getUserById(id: any){
    return this.http.get(this.rootUrl + `/get-user/${id}`)
    .pipe(tap((user) => this.log(`fetched user with id=${id}`)))
  }

  updateUser(user: any){
    return this.http.put(this.rootUrl + `/update-user/${user._id}`, user, this.httpOptions)
    .pipe(tap((updatedUser) => this.log(`updated user with id=${user._id}`)))
  }

  deleteUser(id: any){
    return this.http.delete(this.rootUrl + `/delete-user/${id}`, this.httpOptions)
    .pipe(tap((user) => this.log(`deleted user with id=${id}`)))
  }

}
