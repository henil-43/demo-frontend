import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css']
})
export class GetusersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers()
  }
  data = []
  isShown = false
  id = ""
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
    this.isShown = !this.isShown;
    console.log("ab abcba absvb :",this.isShown);
  }

  setId(id: any){
    this.id = id
  }

}
