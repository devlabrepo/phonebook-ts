import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '../contacts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private mainService: MainService) { }

  contacts = new Array<Contacts>();

  ngOnInit() {
    this.getActualContacts();
  }

  delete(number) {
    this.mainService.delete(number);
  }

  getActualContacts() {
    this.mainService.getObsContacts().subscribe((c: Contacts[]) => {
      this.contacts = c;
    });
  }

}
