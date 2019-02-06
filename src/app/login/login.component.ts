import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService) { }

  ngOnInit() {
  }

  login(formData: NgForm) {
this.auth.login(formData.value.login, formData.value.password)
  }

  logout() {}

  signup(formData: NgForm) {
    this.auth.signup(formData.value.login, formData.value.password)
  }

}
