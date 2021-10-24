import { Component } from "@angular/core";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AdminAboutComponent{

  newSkill = '';
  skills = [];
  skillModalState = 'modal';

  displaySkillModal = () => {
    this.skillModalState = 'modal modal-active';
  };
}





// import IndexAPI from "../../../../apis/indexAPI";
// import FooterC from "../../footer.component";
// import SkillC from "../add-skill/add-skill.component";

// function importAll(icons) {
//   let images = {};
//   icons.keys().forEach((icon) => {
//     images[icon.replace("./", "")] = icons(icon);
//   });
//   return images;
// }
// const skillIcons = importAll(require.context("../../images/skills"));

// const AboutC = () => {

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // console.log(skillIcons[`bootstrap-brands.svg`])

//         document.addEventListener("mousedown", (event) => {
//           if (skillRef.current !== null) {
//             if (!skillRef.current.contains(event.target)) {
//               setSkillModal("modal");
//             }
//           }
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
//         setSkills(skillArray);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [newSkill]);

//   return (

//   );
// };

// export default AboutC;
