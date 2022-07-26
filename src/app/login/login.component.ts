import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChatSocketService } from '../chat-socket.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogggedIn = false

  constructor(private usersService: UsersService, private chatSocketService: ChatSocketService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.toggleOnlineStatus(this.authService.getUser().id, false)
  }

  login(email: string, password: string){
    email = email.trim()
    password = password.trim()

    if(!email && !password){
      return ;
    }
    this.usersService.login(email, password)
    .subscribe((res: any) => {
      if(res.status == 200){
        this.authService.saveToken(res.data.accessToken)
        this.authService.saveUser(res.data)
        this.isLogggedIn = true;
        this.router.navigate(['/users'])
      }
      else{
        console.log(res)
      }
    })

  }

  toggleOnlineStatus(id: any, status: any){
    this.usersService.changeStatus(id, status)
    .subscribe((res: any) => {
      this.chatSocketService.socket.emit('update-status', res)
    })
  }


}
