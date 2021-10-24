import { Component } from "@angular/core";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html'
})

export class AdminUpdateProjectComponent{

  files = [];
  projectImages = [];
  projectFiles = [];
  primaryImage = '';
  skills = [];
  projectSkills = [];

  titles = [];
  titleInput = '';
  thumbnails = [];
  tech = [];
  oldTitle = '';

  skillSet = async (skillInput: HTMLTextAreaElement, checked) => {
    try {

      if (checked) {
        this.skills.push(skillInput)
      }

    } catch (err) {
      console.log(err);
    }
  };

  projectSet = async (imageInput: HTMLTextAreaElement, checked) => {
    try {

      if (checked) {
        setList(imageInput);
      }

    } catch (err) {
      console.log(err);
    }
  };

  updateProject = async () => {
    try {

      await IndexAPI.put("/projects/update-project", {
        title: this.titleInput,
        projectFiles: this.projectFiles,
        primaryImage: this.primaryImage,
        projectSkills: this.projectSkills,
        oldTitle: this.oldTitle,
      });

      this.titleInput = "";

      // props.setUpdatedProject(updatedProject)
    } catch (err) {
      console.log(err);
    }
  };

}

// import IndexAPI from "../../../../apis/indexAPI";
// import PropTypes from "prop-types";

// const UpdateC = (props) => {

  // projectSet = [];
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
//         setTitle(props.title);
//         setOldTitle(props.title);

//         const titlesArray = [];
//         for (let i = 0; i < props.thumbnails.length; i++) {
//           titlesArray.push(Object.keys(props.thumbnails[i])[0]);
//         }
//         setTitles(titlesArray);

//         importAll(require.context("../../images/projects"));

//         //Sets the full list of files
//         const filesArray = [];
//         for (let i = 0; i < props.thumbnails.length; i++) {
//           filesArray.push(props.thumbnails[i][titles[i]][0][0]["thumbnail"]);
//         }
//         setFiles(filesArray);

//         //Sets list of all of the files pertaining to this project
//         const projectFilesArray = [];
//         for (let i = 0; i < props.thumbnails.length; i++) {
//           if (Object.keys(props.thumbnails[i]).toString() === props.title) {
//             for (
//               let j = 0;
//               j < props.thumbnails[i][props.title][0].length;
//               j++
//             ) {
//               projectFilesArray.push(
//                 props.thumbnails[i][props.title][0][j]["thumbnail"]
//               );
//             }
//           }
//         }
//         setProjectFiles(projectFilesArray);

//         //Get all skills from DB
//         const skills = await IndexAPI.get(`/skills`);
//         const skillsArray = [];
//         for (let i = 0; i < skills.data.results.length; i++) {
//           skillsArray.push(skills.data.results[i].skill);
//         }
//         setSkills(skillsArray);

//         //Sets list of all of the files pertaining to this project
//         const projectTechArray = [];
//         for (let i = 0; i < props.tech.length; i++) {
//           if (Object.keys(props.tech[i]).toString() === props.title) {
//             for (let j = 0; j < props.tech[i][props.title][0].length; j++) {
//               projectTechArray.push(props.tech[i][props.title][0][j]);
//             }
//           }
//         }
//         setProjectSkills(projectTechArray);

//         if (props.thumbnails === []) {
//           setThumbnails([]);
//         } else {
//           setThumbnails(props.thumbnails[0]);
//         }

//         if (props.tech === []) {
//           setTech([]);
//         } else {
//           setTech(props.tech[0]);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [props]);

//   return (

//   );
// };

// UpdateC.propTypes = {
//   title: PropTypes.string,
//   thumbnails: PropTypes.array,
//   tech: PropTypes.array,
// };

// export default UpdateC;
