
import { Component } from "@angular/core";

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html'
})

export class AddSkillComponent{

}

// import IndexAPI from "../../../../apis/indexAPI";
// import PropTypes from "prop-types";

// const AddSkillC = (props) => {
//   const [icons, setIcons] = useState([]);
//   const [category, setCategory] = useState("");
//   const [skill, setSkill] = useState("");
//   const [level, setLevel] = useState("");
//   const [icon, setIcon] = useState("");
//   const [ranking, setRanking] = useState("");
//   const [newSkill] = useState("");

//   const skillInput = useRef(null);

//   let iconSet = [];
//   function importAll(icons) {
//     let images = {};
//     icons.keys().forEach((index) => {
//       images[index.replace("./", "")] = icons(index);
//       Object.keys(images).forEach((key) => {
//         iconSet.push(key);
//         setIcons([...new Set(iconSet)]);
//       });
//     });
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         importAll(require.context("../../images/skills"));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const addSkill = async (e) => {
//     e.preventDefault();
//     try {
//       await IndexAPI.post("/skill/add-skill", {
//         category,
//         skill,
//         level,
//         icon,
//         ranking,
//       });
//       skillInput.current.value = "";

//       props.setNewSkill(newSkill);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (

//   );
// };

// AddSkillC.propTypes = {
//   setNewSkill: PropTypes.func,
// };

// export default AddSkillC;
