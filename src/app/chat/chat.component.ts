import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import * as io from 'socket.io-client'
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { GetusersComponent } from '../getusers/getusers.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats:any = [];
  roomId = "";
  id: string = "";
  user:any = {};
  socket = io.io('http://localhost:8080')

  constructor(private route: ActivatedRoute,private chatService: ChatService, private authService: AuthService, private getUsers: GetusersComponent) { }

  ngOnInit(): void {
    var user = this.authService.getUser();
    this.user = user
    this.id = this.getUsers.id
    this.getChats()

    this.socket.on('new-message', (data) => {
      console.log(data)
      if(data.data.roomId == this.user.id + '-' + this.getUsers.id || this.getUsers.id + '-' + this.user.id){
        console.log("Hiii in room!!!: ", this.roomId)
        this.chats.push(data.data)

      }

    })
  }
  
  async getChats(){

    var temp1 = this.user.id + '-' + this.getUsers.id;
    this.chatService.getChatByRoom(temp1)
    .subscribe((res: any) => {
      console.log(res.data)
      if(res.data.length != 0){
        this.roomId = temp1;
        this.chats = res.data
      }
    })
      
    var temp2 = this.getUsers.id + '-' + this.user.id;
    this.chatService.getChatByRoom(temp2)
    .subscribe((resp: any) => {
      console.log("abc: ", resp.data)
      if(resp.data.length != 0){
        this.roomId = temp2;
        this.chats = resp.data
      }
    })
  }

  sendMessage(message: string){
    message = message.trim()
    if(this.roomId && this.roomId != undefined && this.roomId != ""){ 
      console.log("Hiii2: ", this.roomId)
      this.chatService.saveMessage(this.roomId, message, this.user.firstName)
      .subscribe((res: any) => {
        this.socket.emit('save-message', res)
        console.log(res)
      })
    }
    else{
      this.roomId = this.user.id + '-' + this.getUsers.id
      this.chatService.saveMessage(this.roomId,message, this.user.firstName)
      .subscribe((res: any) => {
        console.log(res)
      })
      this.getChats()
    }
  }

  closePopup(){
    this.getUsers.closePopup()
  }
}
