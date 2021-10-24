
import { Component } from "@angular/core";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html'
})

export class AdminAddProjectComponent{

  projectImages = [];
  skills =[];

  project = '';
  thumbnails = [];
  primaryImage = '';
  projectTech = [];

  createList = async (imageInput: HTMLTextAreaElement, checked, setList, list) => {
    try {
      if (list === null) {
        if (checked) {
          setList(imageInput);
        }
      } else {
        if (checked) {
          setList((list) => [...list, imageInput]);
        }
      }

      if (!checked) {
        setList(list.filter((list) => list !== imageInput));
      }
    } catch (err) {
      console.log(err);
    }
  };

  createProject = async (e) => {
    e.preventDefault();
    try {

      await IndexAPI.post("/projects/add-project", {
        project,
        thumbnails,
        primaryImage,
        projectTech,
      });
      projectInput.current.value = "";

      // props.setCreatedProject(createdProject)
    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../../../apis/indexAPI";

// const CreateC = () => {

  // let projectSet = [];
  // function importAll(projects) {
  //   let images = {};
  //   projects.keys().forEach((index) => {
  //     images[index.replace("./", "")] = projects(index);
  //     Object.keys(images).forEach((key) => {
  //       projectSet.push(key);
  //       setProjectImages([...new Set(projectSet)]);
  //     });
  //   });
  // }

//   const projectInput = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //Get all skills from DB
//         const skills = await IndexAPI.get(`/skills`);
//         const skillsArray = [];
//         for (let i = 0; i < skills.data.results.length; i++) {
//           skillsArray.push(skills.data.results[i].skill);
//         }
//         setSkills(skillsArray);

//         importAll(require.context("../../images/projects"));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);
// return (

//   );
// }

// export default CreateC;
