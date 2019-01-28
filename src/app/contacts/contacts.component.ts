import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { Contacts } from '../contacts';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../categories';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public contact: Contacts = {
    name: "",
    surname: "",
    number: "",
    address: "",
    category: "",
    ranking: 0,
    tags: []
  };

  public tag: string;

  public contacts = new Array<Contacts>();
  public categories: Categories[] = [];

  constructor(
    private mainService: MainService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getContacts();
    this.getCategories();
  }

  public getContacts() {
    this.contacts = [];
    return this.http.get<Array<Contacts>>("http://localhost:8080/api/dto/contacts")
      .subscribe(result => { result.map(o => this.contacts.push(o)) });
  }

  delete(number: string) {
    let phoneNumber = new HttpParams().append("phone", number);
    this.http.delete("http://localhost:8080/api/dto/contacts", { params: phoneNumber }).subscribe(res => {

    }, (err: HttpErrorResponse) => {
      console.error(err);
    }, () => {
      this.getContacts();
    });
  }

  public getCategories() {
    this.categories = [];
    return this.http.get<Array<Categories>>("http://localhost:8080/api/dto/categories")
      .subscribe(result => { result.map(o => this.categories.push(o)) });
  }

  addTags(number: string) {
    let list: string[] = this.tag.split(";");
    let phoneNumber = new HttpParams().append("phone", number);
    return this.http.post("http://localhost:8080/api/dto/tags", list, { params: phoneNumber })
      .subscribe(s => { }, (err: HttpErrorResponse) => { console.error(err) },
        () => {
          this.getContacts();
        })
  };

  addContact(number: string) {
    return this.http.post("http://localhost:8080/api/dto/contacts", this.contact)
      .subscribe(s => { }, (err: HttpErrorResponse) => { console.error(err) },
        () => {
          this.addTags(number);
        })
  }

}
