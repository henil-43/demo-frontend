import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'


@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  socket = io.io('http://localhost:8080')
  
  constructor() { }
}
