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
    // var data: any = []
    // var roomId: any = ""
    // var temp1 = id1 + '-' + id2;
    // var temp2 = id2 + '-' + id1;

    // console.log("temp1: ", temp1)
    // console.log("temp2: ", temp2)

    return this.http.get(this.rootUrl+`/chats/${id}`)
    .pipe(tap(_ => console.log("123456778")),
    catchError((err) => {
      console.log(err)
      return throwError(err)
    }))

    // this.http.get(this.rootUrl+`/chats/${temp2}`)
    // .pipe(tap((chats: any) => {
    //   console.log("Hii1111", chats.data)
    //   if(chats.data && chats.data.length != 0){
    //     roomId = temp2
    //     data.push(chats.data)
    //   }
    // }),
    // catchError((err) => {
    //   console.log(err)
    //   return throwError(err)
    // })
    // ).subscribe()

    // return of({
    //   roomId: roomId,
    //   chats: data
    // })
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
