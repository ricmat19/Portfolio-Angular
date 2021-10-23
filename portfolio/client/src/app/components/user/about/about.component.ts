import { Component } from "@angular/core";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent{

}


// import IndexAPI from "../../../../apis/indexAPI";
// import HeaderC from "../../standard/header/header.component";
// import FooterC from "../../standard/footer/footer.component";

// function importAll(icons) {
//   let images = {};
//   icons.keys().forEach((icon) => {
//     images[icon.replace("./", "")] = icons(icon);
//   });
//   return images;
// }
// const skillIcons = importAll(require.context("../images/skills"));

// const AboutC = () => {
//   const [, setSkillModal] = useState("modal");
//   const [newSkill] = useState("");
//   const [skills, setSkills] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
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

//   () => {
//     setSkillModal("modal modal-active");
//   };

//   return (

//   );
// };

// export default AboutC;
