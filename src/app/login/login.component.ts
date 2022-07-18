import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string){
    email = email.trim()
    password = password.trim()

    if(!email && !password){
      return ;
    }
    this.usersService.login(email, password)
    .subscribe(data => {
      console.log(data);
    })

  }
}
