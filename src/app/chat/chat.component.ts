import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import * as io from 'socket.io-client'
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chats: any;
  // joinned: boolean = false; 
  // newUser = {roomName: '', roomId:''};
  // msgData = {roomId: "", roomName: "", message: ""}
  constructor(private route: ActivatedRoute,private chatService: ChatService, private authService: AuthService, ) { }

  ngOnInit(): void {
    var user = this.authService.getUser();
    if(user != null){
      
    }

  }

  getChats(){
    var user = this.authService.getUser();
    

    //this.chatService.getChatByRoom()
  }

  
}
