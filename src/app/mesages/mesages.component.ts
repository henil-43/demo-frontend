import { Component, OnInit } from '@angular/core';
import { MesagesService } from '../mesages.service';

@Component({
  selector: 'app-mesages',
  templateUrl: './mesages.component.html',
  styleUrls: ['./mesages.component.css']
})
export class MesagesComponent implements OnInit {

  constructor(public messageService: MesagesService) { }

  ngOnInit(): void {
  }

}
