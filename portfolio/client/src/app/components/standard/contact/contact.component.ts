import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// import IndexAPI from "../../apis/indexAPI";
// import HeaderC from "../../standard/header/header.component";
// import FooterC from "../../standard/footer/footer.component";

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

  ngOnInit(){
    this.contact(this.nameInput, this.emailInput, this.subjectInput, this.messageText)
  }

  contact(name: any, email: any, subject: any, message: any){
    return this.http.post(`http://localhost:3000/contact`, [name, email, subject, message]).subscribe((res) => {
        this.contactObject = res;
        console.log(this.contactObject)
      }, (err) => {
        console.log(err)
      }
    );
  }

  handleSubmit = async () => {

    try {
      // await IndexAPI.post("/contact", {
      //   name: this.nameInput,
      //   email: this.emailInput,
      //   subject: this.subjectInput,
      //   message: this.messageText,
      // });

      this.nameInput = "";
      this.emailInput = "";
      this.subjectInput = "";
      this.messageText = "";
    } catch (err) {
      console.log(err);
    }
  };

}
