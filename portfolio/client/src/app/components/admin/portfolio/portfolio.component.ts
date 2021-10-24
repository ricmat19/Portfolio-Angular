import { Component } from "@angular/core";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})

export class AdminPortfolioComponent{

  createModalState = 'modal';
  updateModalState = 'modal';
  deleteModalState = 'modal';

  createdProject = '';
  updatedProject = '';
  deletedProject = '';

  projects = [];

  titles = [];
  allThumbnails = [];
  projectThumbnails = [];
  tech = [];
  skills = [];

  filterButtons = 'skill-buttons';
  filteredThumbnails = [];

  currentTitle = '';
  currentThumbnails = [];
  currentTech = [];

  displayCreateModal = () => {
    this.createModalState="modal modal-active";
  };

  displayUpdateModal = (currentTitle) => {
    try {
      for (let i = 0; i < thumbnails.length; i++) {
        if (thumbnails[i][currentTitle] !== undefined) {
          setCurrentThumbnails(thumbnails[i][currentTitle]);
          break;
        } else {
          setCurrentThumbnails([]);
        }
      }

      for (let i = 0; i < technology.length; i++) {
        if (technology[i][currentTitle] !== undefined) {
          setCurrentTech(technology[i][currentTitle]);
          break;
        } else {
          setCurrentTech([]);
        }
      }

      setCurrentTitle(currentTitle);

      this.updateModalState="modal modal-active";
    } catch (err) {
      console.log(err);
    }
  };

  displayDeleteModal = async (project) => {
    try {
      // setDeletedProject(project);
      this.deleteModalState="modal modal-active";
    } catch (err) {
      console.log(err);
    }
  };

  displayFilter = async () => {
    try {
      if (filterButtons === "skill-buttons") {
        setFilterButtons("skill-buttons skill-buttons-view");
      } else {
        setFilterButtons("skill-buttons");
      }
    } catch (err) {
      console.log(err);
    }
  };

  filterProjects = async (skill) => {
    try {
      const techProjects = [];
      for (let i = 0; i < technology.length; i++) {
        const projectsTech = technology[i][Object.keys(technology[i])][0];
        for (let j = 0; j < projectsTech.length; j++) {
          if (projectsTech[j] === skill) {
            techProjects.push(Object.keys(technology[i])[0]);
          }
        }
      }

      const filteredThumbnails = [];
      for (let i = 0; i < techProjects.length; i++) {
        for (let j = 0; j < thumbnails.length; j++) {
          if (techProjects[i] === thumbnails[j].project) {
            filteredThumbnails.push(thumbnails[j]);
          }
        }
      }
      setFilteredThumbnails(filteredThumbnails);
    } catch (err) {
      console.log(err);
    }
  };

}

// import { useHistory } from "react-router-dom";
// import IndexAPI from "../../../../apis/indexAPI";
// import HeaderC from "../../header.component";
// import FooterC from "../../footer.component";
// import CreateC from "../add-project/add-project.component";
// import UpdateC from "../update-project/update-project.component";
// import DeleteC from "../delete-project/delete-project.component";

// function importAll(projects) {
//   let images = {};
//   projects.keys().forEach((index) => {
//     images[index.replace("./", "")] = projects(index);
//   });
//   return images;
// }
// const projectThumbnails = importAll(require.context("../../images/projects"));

// const PortfolioC = () => {
//   let history = useHistory();

//   const currentProjectThumbnailArray = [];

//   const createRef = useRef();
//   const updateRef = useRef();
//   const deleteRef = useRef();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         document.addEventListener("mousedown", (event) => {
//           if (
//             createRef.current !== null &&
//             updateRef.current !== null &&
//             deleteRef !== null
//           ) {
//             if (!createRef.current.contains(event.target)) {
//               setCreateModal("modal");
//             }
//             if (!updateRef.current.contains(event.target)) {
//               setUpdateModal("modal");
//             }
//             if (!deleteRef.current.contains(event.target)) {
//               setDeleteModal("modal");
//             }
//           }
//         });

//         const skills = await IndexAPI.get(`/skills`);
//         const skillsList = [];
//         for (let i = 0; i < skills.data.data.skills.length; i++) {
//           skillsList.push(skills.data.data.skills[i].skill);
//         }
//         setSkills(skillsList);

//         //Get all project thumbnails and images from DB
//         const projects = await IndexAPI.get(`/projects`);
//         setProjects(projects.data.results);

//         //Adds all the projects in project_images to the projectThumbnailArray
//         const projectThumbnailArray = [];
//         Object.keys(projectThumbnails);
//         for (let i = 0; i < projects.data.results[0].length; i++) {
//           if (
//             projectThumbnailArray.indexOf(
//               projects.data.results[0][i].thumbnail
//             ) === -1
//           ) {
//             projects.data.results[0][i].module =
//               projectThumbnails[projects.data.results[0][i].thumbnail];
//             projectThumbnailArray.push(projects.data.results[0][i]);
//           }
//         }

//         //Loops through the projectThumbnailArray
//         const projectTitles = [];
//         for (let i = 0; i < projectThumbnailArray.length; i++) {
//           const tempArray = [];
//           //Loops through all data provided from project_images
//           for (let j = 0; j < projects.data.results[0].length; j++) {
//             //Checks if the current item in project_images pertains to the current project
//             if (
//               projects.data.results[0][j].project ===
//               projectThumbnailArray[i].project
//             ) {
//               tempArray.push(projects.data.results[0][j]);
//             }
//           }
//           const key = projectThumbnailArray[i].project;
//           const tempObject = {};
//           tempObject[key] = [tempArray];
//           if (projectTitles.indexOf(projectThumbnailArray[i].project) === -1) {
//             projectTitles.push(projectThumbnailArray[i].project);
//           }
//           currentProjectThumbnailArray.push(tempObject);
//         }

//         //Filters out duplicate project thumbnail objects
//         let exists = false;
//         const filteredProjectThumbnailArray = [];
//         for (let i = 0; i < currentProjectThumbnailArray.length; i++) {
//           if (filteredProjectThumbnailArray.length > 0) {
//             for (let j = 0; j < filteredProjectThumbnailArray.length; j++) {
//               if (
//                 Object.keys(currentProjectThumbnailArray[i])[0] ===
//                 Object.keys(filteredProjectThumbnailArray[j])[0]
//               ) {
//                 exists = true;
//               }
//             }
//             if (exists === false) {
//               filteredProjectThumbnailArray.push(
//                 currentProjectThumbnailArray[i]
//               );
//             }
//           } else {
//             filteredProjectThumbnailArray.push(currentProjectThumbnailArray[0]);
//           }
//           exists = false;
//         }
//         setAllThumbnails(filteredProjectThumbnailArray);

//         const primaryThumbnailArray = [];
//         for (let i = 0; i < filteredProjectThumbnailArray.length; i++) {
//           for (
//             let j = 0;
//             j <
//             filteredProjectThumbnailArray[i][
//               Object.keys(filteredProjectThumbnailArray[i])[0]
//             ][0].length;
//             j++
//           ) {
//             if (
//               filteredProjectThumbnailArray[i][
//                 Object.keys(filteredProjectThumbnailArray[i])[0]
//               ][0][j].primary_image === 1
//             ) {
//               primaryThumbnailArray.push(
//                 filteredProjectThumbnailArray[i][
//                   Object.keys(filteredProjectThumbnailArray[i])[0]
//                 ][0][j]
//               );
//             }
//           }
//         }

//         setTitles(projectTitles);
//         setThumbnails(primaryThumbnailArray);
//         setFilteredThumbnails(primaryThumbnailArray);

//         //Adds all the projects in project_tech to the projectTechArray
//         const projectTechArray = [];
//         for (let i = 0; i < projects.data.results[1].length; i++) {
//           if (
//             projectTechArray.indexOf(projects.data.results[1][i].project) === -1
//           ) {
//             projectTechArray.push(projects.data.results[1][i].project);
//           }
//         }

//         //Loops through the projectArray
//         const currentProjectTechArray = [];
//         for (let i = 0; i < projectTechArray.length; i++) {
//           const tempArray = [];
//           //Loops through all data provided from project_tech
//           for (let j = 0; j < projects.data.results[1].length; j++) {
//             //Checks if the current item in project_tech pertains to the current project
//             if (projects.data.results[1][j].project === projectTechArray[i]) {
//               tempArray.push(projects.data.results[1][j].technology);
//             }
//           }
//           const key = projectTechArray[i];
//           const tempObject = {};
//           tempObject[key] = [tempArray];
//           currentProjectTechArray.push(tempObject);
//         }
//         setTechnology(currentProjectTechArray);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);



//   return (

//   );
// };

// export default PortfolioC;
