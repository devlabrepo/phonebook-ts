import { Injectable } from '@angular/core';
import { Contacts } from './contacts';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private router: Router) { }

  contacts = new Array();

  getContacts() {
    this.contacts = [];
    this.http.get<Array<Contacts>>("http://localhost:8080/api/dto/contacts").subscribe(res => {
      res.map(r => this.contacts.push(r));
    }, (err) => {
      console.log(err);
    }, () => {
      console.log(this.contacts);
    })
    return this.contacts;

  }


  delete(number): Observable<Contacts> {
    this.http.delete("http://localhost:8080/api/dto/contacts?phone=" + number).subscribe(res => {
    }, (err) => {
      console.log(err);
    }, () => {
      //  console.log();
      //  this.router.navigateByUrl("/contacts");
      this.getContacts();
    });
    return;

  }

  public getObsContacts(): any {
    const contactsObservable = new Observable(observer => {
      setInterval(() => {
        observer.next(this.getContacts());
      }, 10000);
    });
    return contactsObservable;
  }

}
