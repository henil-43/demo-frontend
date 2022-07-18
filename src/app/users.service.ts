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
    .pipe(tap((user) => this.log(`user loggen in ${user}`)));
  }
}
