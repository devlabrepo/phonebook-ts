import { Injectable } from '@angular/core';
import { Contact } from '../basic/contacts';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../basic/category';

const config = environment.config;

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private router: Router) { }

  private counter: number = 0;
  private sum = new Subject<number>();

  incrementCounter(): void {
    this.counter++;
    this.sum.next(this.counter);
  }

  getCounter(): Observable<number> {
    return this.sum.asObservable();
  }

  getContacts(): Observable<Array<Contact>> {
    return this.http.get<Array<Contact>>(config.host + "/contacts");
  }

  getContactsResponse(): Observable<HttpResponse<Response>> {
    return this.http.get<Response>(config.host + "/contacts", { observe: 'response' });
  }

  postContact(contact: Contact) {
    return this.http.post(config.host + "/contacts", contact)
  }

  postTags(phone: string, tags: string[]) {
    let param = new HttpParams().append("phone", phone);
    return this.http.post(config.host + "/tags", tags, { params: param })
  }

  getCategories() {
    return this.http.get<Array<Category>>(config.host + "/categories");
  }

  putContactAddress(phone: string, address: string) {
    let param = new HttpParams().set("phone", phone).set("city", address);
    return this.http.put(config.host + "/contacts", { }, { params: param })
  }

  deleteContact(phone: string) {
    let param = new HttpParams().append("phone", phone);
    return this.http.delete(config.host + "/contacts", { params: param })
  }
}
