import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  rootUrl = "http://localhost:8000/api"
  constructor(private http: HttpClient) { }

  getChatByRoom(id: any): Observable<any>{

    return this.http.get(this.rootUrl+`/chats/${id}`)
    .pipe(tap(_ => console.log("123456778")),
    catchError((err) => {
      console.log(err)
      return throwError(err)
    }))

  }

  saveMessage(roomId: string, message: string, from: string){
    var data = {
      roomId: roomId,
      message: message,
      from: from
    }
    return this.http.post(this.rootUrl + '/chat', data, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
    .pipe(tap(_ => console.log("message added")),
    catchError((err) =>{
      return throwError(err)
    })
    )
  }
}
