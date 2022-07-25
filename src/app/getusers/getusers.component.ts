import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatComponent } from '../chat/chat.component';
import { UsersService } from '../users.service';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {

  constructor(private usersService: UsersService, private authService: AuthService) { }
  
  data = []
  isShown = false
  clickedUser: any
  user: any
  socket = io.io('http://localhost:8080')


  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.getUsers()
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
      this.socket.emit('update-status', res)
    })
  }

}
