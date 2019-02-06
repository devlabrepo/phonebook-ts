import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Contact } from '../basic/contacts';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../basic/category';

const config = environment.config;


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {

  public contacts = new Array<Contact>();
  public categories: Category[] = [];
  flag: boolean = false;
  addFlag: boolean = false;


  contactForm: FormGroup;

  constructor(
    private mainService: MainService,
    private http: HttpClient,
    private spinner: NgxSpinnerService) {

    this.contactForm = this.createForm();
  }

  ngOnInit() {
  //  this.mainService.incrementCounter();
    this.getContacts();
    this.getCategories();
  }

  public onError(err: any) {
    console.error(err);
    this.spinner.hide();
    return err;
  }

  public onSuccess(result: Contact[]) {
    this.contacts = [];
    return result.map(contact => this.contacts.push(contact));
  }

  public onComplete() {
    this.spinner.hide();
  }

  getContacts() {
    this.contacts = [];
    this.mainService
      .getContacts()
      .subscribe(
        result => { result.map(r => { this.contacts.push(r) }) },
        (err: HttpErrorResponse) => { err.message },
        () => { console.log(this.contacts) }
      );
  }

  public getCategories() {
    this.categories = [];
    this.mainService
      .getCategories()
      .subscribe(result => { result.map(c => this.categories.push(c)) });
  }

  prepareTags(tags: string) {
    return tags.split(",");
  }

  addTags(phone: string, tags: string[]) {
    this.mainService
      .postTags(phone, tags)
      .subscribe(t => { },
        (e: HttpErrorResponse) => { console.error(e) },
        () => {
          this.flag = false;
          this.getContacts();
        }
      );
  };

  delete(phone: string): void {
    this.mainService.deleteContact(phone)
      .subscribe(
        r => { },
        e => this.onError(e),
        () => this.getContacts()
      );
  }

  addContact() {
    let contact: Contact = {
      name: this.contactForm.value.name,
      surname: this.contactForm.value.surname,
      number: this.contactForm.value.number,
      address: this.contactForm.value.address,
      category: this.contactForm.value.category,
      ranking: this.contactForm.value.ranking,
      tags: this.prepareTags(this.contactForm.value.tags)
    }

    this.mainService.postContact(contact)
      .subscribe(c => { }, (e: HttpErrorResponse) => { console.error(e) },
        () => {
          this.addTags(contact.number, contact.tags);
          this.contactForm.reset();
        })
  }

  update(phone: string, address: string) {
    this.mainService.putContactAddress(phone, address)
      .subscribe(s => { }, (e: HttpErrorResponse) => { console.error(e) },
        () => {
          this.flag = false;
          this.getContacts();
        })
  }

  onMouse(event: Event) {
    console.log(event);

    if (!this.flag) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  addFlagTriger() {
    if (!this.addFlag) {
      this.addFlag = true;
    } else {
      this.addFlag = false;
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      address: new FormControl(),
      category: new FormControl(),
      number: new FormControl(),
      ranking: new FormControl(1),
      tags: new FormControl()
    });
  }

  getContactsResponse() {
    this.mainService
      .getContactsResponse()
      .subscribe(
        (response: HttpResponse<Response>) => { console.log(response) },
        (err: HttpErrorResponse) => { err.message },
        () => { }
      );
  }

  public getContactsButton() {
    this.contacts = [];
    this.spinner.show();
    return this.http.get<Array<Contact>>(config.host + "/contacts")
      .subscribe(
        r => this.onSuccess(r),
        err => this.onError(err),
        () => this.onComplete()
      );
  }

}
