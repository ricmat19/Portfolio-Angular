import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

export interface Contact {
  name: string,
  email: string,
  subject: string,
  message: string,
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent{

  contactObject = {}
  nameInput = '';
  emailInput = '';
  subjectInput = '';
  messageText = '';

  constructor(private http: HttpClient){}

  contactSubmit(name: any, email: any, subject: any, message: any){
    return this.http.post(`http://localhost:3000/contact`, [name, email, subject, message]).subscribe((res) => {
        this.contactObject = res;
        console.log(this.contactObject)
      }, (err) => {
        console.log(err)
      }
    );
  }

}
