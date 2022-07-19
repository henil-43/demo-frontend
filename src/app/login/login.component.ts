import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
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
        this.router.navigate(['/users'])
      }
      else{
        console.log(res)
      }
    })

  }


}
