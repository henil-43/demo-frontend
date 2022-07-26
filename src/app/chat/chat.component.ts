import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { GetusersComponent } from '../getusers/getusers.component';
import { UsersService } from '../users.service';
import { ChatSocketService } from '../chat-socket.service';

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
  clickedUser: any = {}
  status:any

  constructor(private route: ActivatedRoute,private chatService: ChatService, private authService: AuthService, private usersService: UsersService , private getUsers: GetusersComponent, private chatSocketService: ChatSocketService) { }

  ngOnInit(): void {
    var user = this.authService.getUser();
    this.user = user
    this.id = this.getUsers.clickedUser._id
    this.clickedUser = this.getUsers.clickedUser
    this.getUserDetails(this.getUsers.clickedUser._id)
    console.log("sgbrswg ngrlswng swogna ",this.getUsers.clickedUser)
    this.getChats()

    
    this.chatSocketService.socket.on('new-message', (data) => {
      console.log(data)
      if(data.data.roomId == this.user.id + '-' + this.getUsers.clickedUser._id || this.getUsers.clickedUser._id + '-' + this.user.id){
        console.log("Hiii in room!!!: ", this.roomId)
        this.chats.push(data.data)

      }

    })

    this.chatSocketService.socket.on('status-changed', (data) => {
      console.log(data)
      if(this.getUsers.clickedUser._id == data.data.userId){
        this.status = data.data.status

      }
    })
  }
  

  getUserDetails(id: any){
    this.usersService.getUserById(id)
    .subscribe((res: any) => {
      console.log(res.data)
      this.status = res.data.status
    })
  }

  async getChats(){

    var temp1 = this.user.id + '-' + this.getUsers.clickedUser._id;
    this.chatService.getChatByRoom(temp1)
    .subscribe((res: any) => {
      console.log(res.data)
      if(res.data.length != 0){
        this.roomId = temp1;
        this.chats = res.data
      }
    })
      
    var temp2 = this.getUsers.clickedUser._id + '-' + this.user.id;
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
        this.chatSocketService.socket.emit('save-message', res)
        console.log(res)
      })
    }
    else{
      this.roomId = this.user.id + '-' + this.getUsers.clickedUser._id
      this.chatService.saveMessage(this.roomId,message, this.user.firstName)
      .subscribe((res: any) => {
        console.log(res)
        this.chatSocketService.socket.emit('save-message', res)
      })
      this.getChats()
    }
  }

  closePopup(){
    this.getUsers.closePopup()
  }

  toggleOnlineStatus(id:any, status: any){
    this.getUsers.toggleOnlineStatus(id, status)
  }
}
