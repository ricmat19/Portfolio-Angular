import { Component } from "@angular/core";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html'
})

export class AdminAddProjectComponent{

  projectInput = '';
  projectImages = [];
  skillInput = '';
  skills =[];

  titleInput = '';
  thumbnails = [];
  primaryImage = '';
  projectTech = [];

  constructor(){
    try {
      //Get all skills from DB
      const skills = await IndexAPI.get(`/skills`);
      const skillsArray = [];
      for (let i = 0; i < skills.data.results.length; i++) {
        skillsArray.push(skills.data.results[i].skill);
      }
      skills.push(skillsArray);

      let projectSet = [];
      function importAll(projects) {
        let images = {};
        projects.keys().forEach((index) => {
          images[index.replace("./", "")] = projects(index);
          Object.keys(images).forEach((key) => {
            projectSet.push(key);
            projectImages.push(projectSet);
          });
        });
      }
      importAll(require.context("../../images/projects"));

    } catch (err) {
      console.log(err);
    }
  }


  skillSet = async (checked) => {
    try {

      if (checked) {
        this.skills.push(this.skillInput)
      }

    } catch (err) {
      console.log(err);
    }
  };

  projectSet = async (imageInput: HTMLTextAreaElement, checked) => {
    try {

      if (checked) {
        this.projectImages.push(this.projectInput);
      }

    } catch (err) {
      console.log(err);
    }
  };

  createProject = async () => {

    try {

      await IndexAPI.post("/projects/add-project", {
        project: this.titleInput,
        thumbnails: this.thumbnails,
        primaryImage: this.primaryImage,
        projectTech: this.projectTech,
      });
      this.titleInput = "";

      // props.setCreatedProject(createdProject)
    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../../../apis/indexAPI";

// const CreateC = () => {

//   const projectInput = useRef(null);

// return (

//   );
// }

// export default CreateC;
