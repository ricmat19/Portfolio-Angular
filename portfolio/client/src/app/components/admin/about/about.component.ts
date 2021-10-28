import { Component } from "@angular/core";
// import FooterComponent from "../../standard/footer/footer.component";
// import SkillC from "../add-skill/add-skill.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AdminAboutComponent{

  newSkill = '';
  skills = [];
  skillModalState = 'modal';

//   constructor(){

//       try {

//         function importAll(icons) {
//           let images = {};
//           icons.keys().forEach((icon) => {
//             images[icon.replace("./", "")] = icons(icon);
//           });
//           return images;
//         }
//         importAll(require.context("../../images/skills"));

//         document.addEventListener("mousedown", (event) => {
//           this.skillModalState = 'modal';
//         });

//         //Get all skills from DB
//         const skills = await IndexAPI.get(`/skills`);
//         const skillArray = [];
//         for (let i = 0; i < skills.data.results.length; i++) {
//           skills.data.results[i].iconImage =
//             skillIcons[skills.data.results[i].icon];
//           skillArray.push(skills.data.results[i]);
//         }
//         skillArray.sort(function (a, b) {
//           return a.ranking - b.ranking;
//         });
//         skills.push(skillArray);
//       } catch (err) {
//         console.log(err);
//       }

//     };

//     displaySkillModal = () => {
//       this.skillModalState = 'modal modal-active';
//     }

//   }

// }
}
