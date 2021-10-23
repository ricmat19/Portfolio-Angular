import { Component } from "@angular/core";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent{

}


// import IndexAPI from "../../apis/indexAPI";
// import HeaderC from "../../standard/header/header.component";
// import FooterC from "../../standard/footer/footer.component";

// const ContactC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const nameInput = useRef(null);
//   const emailInput = useRef(null);
//   const subjectInput = useRef(null);
//   const messageInput = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await IndexAPI.post("/contact", {
//         name: name,
//         email: email,
//         subject: subject,
//         message: message,
//       });

//       nameInput.current.value = "";
//       emailInput.current.value = "";
//       subjectInput.current.value = "";
//       messageInput.current.value = "";
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (

//   );
// };

// export default ContactC;
