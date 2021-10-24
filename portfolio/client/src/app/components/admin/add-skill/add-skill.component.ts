
import { Component } from "@angular/core";

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html'
})

export class AdminAddSkillComponent{

  icons = [];
  skill = '';
  category = '';
  ranking = '';
  level = '';
  icon = '';
  newSkill = '';

  addSkill = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/skill/add-skill", {
        category,
        skill,
        level,
        icon,
        ranking,
      });
      skillInput.current.value = "";

      props.setNewSkill(newSkill);
    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../../../apis/indexAPI";
// import PropTypes from "prop-types";

// const AddSkillC = (props) => {

  // let iconSet = [];
  // function importAll(icons) {
  //   let images = {};
  //   icons.keys().forEach((index) => {
  //     images[index.replace("./", "")] = icons(index);
  //     Object.keys(images).forEach((key) => {
  //       iconSet.push(key);
  //       setIcons([...new Set(iconSet)]);
  //     });
  //   });
  // }

//   const skillInput = useRef(null);

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

//   return (

//   );
// };

// AddSkillC.propTypes = {
//   setNewSkill: PropTypes.func,
// };

// export default AddSkillC;
