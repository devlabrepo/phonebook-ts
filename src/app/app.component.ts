import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './basic/contacts';
import { MainService } from './service/main.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


 
  counter: number;
  title:string = 'Welcome to Phonebook-ts app ';


  ngOnInit() {
   
  }

  constructor(private mainService: MainService, private auth: AuthService) { }

  getCounter() {
    this.mainService.getCounter().subscribe(data => {this.counter = data});
  }


}
