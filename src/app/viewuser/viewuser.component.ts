import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import {Location} from '@angular/common'
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usersService: UsersService, private location: Location) { }

  user: any;

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void{
    const id = (this.route.snapshot.paramMap.get('id'));
    this.usersService.getUserById(id)
    .subscribe((res: any) => {
      this.user = res.data
      console.log(res)
    })
  }

  goBack(): void{
    this.location.back();
  }

}
