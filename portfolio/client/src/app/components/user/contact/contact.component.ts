import { Component } from "@angular/core";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent{

  nameInput = '';
  emailInput = '';
  subjectInput = '';
  messageText = '';

  handleSubmit = async () => {

    try {
      await IndexAPI.post("/contact", {
        name: this.nameInput,
        email: this.emailInput,
        subject: this.subjectInput,
        message: this.messageText,
      });

      this.nameInput = "";
      this.emailInput = "";
      this.subjectInput = "";
      this.messageText = "";
    } catch (err) {
      console.log(err);
    }
  };

}


// import IndexAPI from "../../apis/indexAPI";
// import HeaderC from "../../standard/header/header.component";
// import FooterC from "../../standard/footer/footer.component";

// const ContactC = () => {

//   const nameInput = useRef(null);
//   const emailInput = useRef(null);
//   const subjectInput = useRef(null);
//   const messageInput = useRef(null);

//   return (

//   );
// };

// export default ContactC;
