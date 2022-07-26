import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatSocketService } from '../chat-socket.service';
import { ChatComponent } from '../chat/chat.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {

  constructor(private usersService: UsersService, private authService: AuthService, private chatSocketService: ChatSocketService) { }
  
  data = []
  isShown = false
  clickedUser: any
  user: any

  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.getUsers()
    this.toggleOnlineStatus(this.authService.getUser().id, false)
  }

  getUsers(){
    this.usersService.getUsers()
    .subscribe((res: any) => {
      this.data = res.data;
      console.log(res.data)
    })
  }
  dispColumns = ["firstName", "lastName", "email", "address", "phoneNo", "age", "actions"];

  deleteUser(id: any): void{
    this.usersService.deleteUser(id)
    .subscribe()

    this.data = this.data.filter((h: any) => h._id!== id)
  }
  toggleChatDisplay(){
    this.isShown = true;
  }

  closePopup(){
    this.isShown = false
  }

  setUser(data: any){
    this.clickedUser = data
  }

  toggleOnlineStatus(id: any, status: any){
    this.usersService.changeStatus(id, status)
    .subscribe((res: any) => {
      this.chatSocketService.socket.emit('update-status', res)
    })
  }

}
