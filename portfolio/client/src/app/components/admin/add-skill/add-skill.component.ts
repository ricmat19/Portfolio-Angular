
import { Component } from "@angular/core";

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html'
})

export class AdminAddSkillComponent{

  icons = [];
  skillInput = '';
  categorySelection = '';
  rankSelection = '';
  levelSelection = '';
  iconSelection = '';
  newSkill = '';

  construction(){

    try {

      let iconSet = [];
      function importAll(icons) {
        let images = {};
        icons.keys().forEach((index) => {
          images[index.replace("./", "")] = icons(index);
          Object.keys(images).forEach((key) => {
            iconSet.push(key);
            setIcons([...new Set(iconSet)]);
          });
        });
      }

      importAll(require.context("../../images/skills"));

    } catch (err) {
      console.log(err);
    }
  }

  addSkill = async () => {
    try {
      await IndexAPI.post("/skill/add-skill", {
        skill: this.skillInput,
        category: this.categorySelection,
        rank: this.rankSelection,
        level: this.levelSelection,
        icon: this.iconSelection,
      });

      this.skillInput = "";

      props.setNewSkill(newSkill);

    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../../../apis/indexAPI";
// import PropTypes from "prop-types";

// const AddSkillC = (props) => {



//   const skillInput = useRef(null);

//   return (

//   );
// };

// AddSkillC.propTypes = {
//   setNewSkill: PropTypes.func,
// };

// export default AddSkillC;
