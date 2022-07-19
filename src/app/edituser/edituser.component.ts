import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usersService: UsersService, private location: Location) { }

  user: any;

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void{
    const id = this.route.snapshot.paramMap.get('uid');
    this.usersService.getUserById(id)
    .subscribe((res: any) => {
      this.user = res.data
      console.log(res)
    })
  }

  goBack(): void{
    this.location.back()
  }

  save():void {
    if(this.user){
      this.usersService.updateUser(this.user)
      .subscribe(() => this.goBack())
    }
  }

}
