import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoggedIn = false
  constructor(private usersService: UsersService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(firstName: string, lastName: string, address: string, email:string, password: string, phoneNo: string, age: string){
    firstName = firstName.trim()
    lastName = lastName.trim()
    address = address.trim()
    email = email.trim()
    password = password.trim()
    const updatedPhoneNo = parseInt(phoneNo.trim())
    const updatedAge = parseInt(age.trim())

    if(!firstName && !lastName && !address && !email && !password && !phoneNo && !age){
      return ;
    }

    this.usersService.signup(firstName, lastName, address, email, password, updatedPhoneNo, updatedAge)
    .subscribe((res: any) =>{
      if(res.status == 200){
        this.authService.saveToken(res.data.accessToken)
        this.authService.saveUser(res.data)
        this.isLoggedIn = true
        this.router.navigate(['/users']);
      }
      else{
        console.log(res);
      }
    } );
  }

}
