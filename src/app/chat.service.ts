import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  rootUrl = "http://localhost:8000/api"
  constructor(private http: HttpClient) { }

  getChatByRoom(room: any){
    return this.http.get(this.rootUrl+`chats/${room}`)
    .pipe(tap(_ => console.log("messages fetched")),
    catchError((err) => {
      return throwError(err)
    })
    )
  }

  saveMessage(data: any){
    return this.http.post(this.rootUrl + 'chat', data, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
    .pipe(tap(_ => console.log("message added")),
    catchError((err) =>{
      return throwError(err)
    })
    )
  }
}
