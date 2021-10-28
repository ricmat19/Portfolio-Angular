import { ArrayType } from "@angular/compiler";
import { Component } from "@angular/core";
// import IndexAPI from "../../../../apis/indexAPI";
// import HeaderC from "../../header.component";
// import FooterC from "../../footer.component";
// import CreateC from "../add-project/add-project.component";
// import UpdateC from "../update-project/update-project.component";
// import DeleteC from "../delete-project/delete-project.component";

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
  titlesArray = [];
  allThumbnailsArray = [];
  projectThumbnailsArray = [];
  techArray = [];
  skillsArray = [];

  filterButtons = 'skill-buttons';
  filteredThumbnailsArray = [];

  currentTitle = '';
  currentThumbnailsArray = [];
  currentTechArray = [];

  tempObject = {};

  constructor(){
    // function importAll(projects) {
    //   let images = {};
    //   projects.keys().forEach((index) => {
    //     images[index.replace("./", "")] = projects(index);
    //   });
    //   return images;
    // }
    // importAll(require.context("../../images/projects"));

    try {
      document.addEventListener("mousedown", (event) => {
        // if (
        //   // createRef.current !== null &&
        //   // updateRef.current !== null &&
        //   // deleteRef !== null
        // ) {
          // if (!createRef.current.contains(event.target)) {
            this.createModalState = "modal";
          // }
          // if (!updateRef.current.contains(event.target)) {
            this.updateModalState = "modal";
          // }
          // if (!deleteRef.current.contains(event.target)) {
            this.deleteModalState = "modal";
          // }
        // }
      });

      // const skills = await IndexAPI.get(`/skills`);
      // for (let i = 0; i < skills.data.data.skills.length; i++) {
      //   this.skillsArray.push(skills.data.data.skills[i].skill);
      // }

      //Get all project thumbnails and images from DB
      // this.projects = await IndexAPI.get(`/projects`);

      //Adds all the projects in project_images to the projectThumbnailArray
      // const projectThumbnailArray = [];
      // Object.keys(projectThumbnails);
      // for (let i = 0; i < this.projects.data.results[0].length; i++) {
      //   if (
      //     projectThumbnailArray.indexOf(
      //       this.projects.data.results[0][i].thumbnail
      //     ) === -1
      //   ) {
      //     this.projects.data.results[0][i].module =
      //       projectThumbnails[projects.data.results[0][i].thumbnail];
      //     projectThumbnailArray.push(projects.data.results[0][i]);
      //   }
      // }

      //Loops through the projectThumbnailArray
      // const projectTitles = [];
      // for (let i = 0; i < projectThumbnailArray.length; i++) {
      //   const tempArray = [];
      //   //Loops through all data provided from project_images
      //   for (let j = 0; j < this.projects.data.results[0].length; j++) {
      //     //Checks if the current item in project_images pertains to the current project
      //     if (
      //       this.projects.data.results[0][j].project ===
      //       projectThumbnailArray[i].project
      //     ) {
      //       tempArray.push(this.projects.data.results[0][j]);
      //     }
      //   }
      //   const key = projectThumbnailArray[i].project;

        // this.tempObject[key] = [tempArray];
        // if (projectTitles.indexOf(projectThumbnailArray[i].project) === -1) {
        //   projectTitles.push(projectThumbnailArray[i].project);
        // }
        // this.currentProjectThumbnailArray.push(this.tempObject);
      // }

      //Filters out duplicate project thumbnail objects
      // let exists = false;
      // const filteredProjectThumbnailArray = [];
      // for (let i = 0; i < currentProjectThumbnailArray.length; i++) {
      //   if (filteredProjectThumbnailArray.length > 0) {
      //     for (let j = 0; j < filteredProjectThumbnailArray.length; j++) {
      //       if (
      //         Object.keys(currentProjectThumbnailArray[i])[0] ===
      //         Object.keys(filteredProjectThumbnailArray[j])[0]
      //       ) {
      //         exists = true;
      //       }
      //     }
      //     if (exists === false) {
      //       filteredProjectThumbnailArray.push(
      //         currentProjectThumbnailArray[i]
      //       );
      //     }
      //   } else {
      //     filteredProjectThumbnailArray.push(currentProjectThumbnailArray[0]);
      //   }
      //   exists = false;
      // }
      // this.allThumbnailsArray.push(filteredProjectThumbnailArray);

      // const primaryThumbnailArray = [];
      // for (let i = 0; i < filteredProjectThumbnailArray.length; i++) {
      //   for (
      //     let j = 0;
      //     j <
      //     filteredProjectThumbnailArray[i][
      //       Object.keys(filteredProjectThumbnailArray[i])[0]
      //     ][0].length;
      //     j++
      //   ) {
      //     if (
      //       filteredProjectThumbnailArray[i][
      //         Object.keys(filteredProjectThumbnailArray[i])[0]
      //       ][0][j].primary_image === 1
      //     ) {
      //       primaryThumbnailArray.push(
      //         filteredProjectThumbnailArray[i][
      //           Object.keys(filteredProjectThumbnailArray[i])[0]
      //         ][0][j]
      //       );
      //     }
      //   }
      // }

      // this.titlesArray.push(projectTitles);
      // this.allThumbnailsArray.push(primaryThumbnailArray);
      // this.filteredThumbnailsArray(primaryThumbnailArray);

      //Adds all the projects in project_tech to the projectTechArray
      // const projectTechArray = [];
      // for (let i = 0; i < this.projects.data.results[1].length; i++) {
      //   if (
      //     projectTechArray.indexOf(this.projects.data.results[1][i].project) === -1
      //   ) {
      //     projectTechArray.push(this.projects.data.results[1][i].project);
      //   }
      // }

      //Loops through the projectArray
      // const currentProjectTechArray = [];
      // for (let i = 0; i < projectTechArray.length; i++) {
      //   const tempArray = [];
      //   //Loops through all data provided from project_tech
      //   for (let j = 0; j < this.projects.data.results[1].length; j++) {
      //     //Checks if the current item in project_tech pertains to the current project
      //     if (this.projects.data.results[1][j].project === projectTechArray[i]) {
      //       tempArray.push(this.projects.data.results[1][j].technology);
      //     }
      //   }
      //   const key = projectTechArray[i];
      //   const tempObject = {};
      //   tempObject[key] = [tempArray];
      //   currentProjectTechArray.push(tempObject);
      // }
  //     this.techArray.push(currentProjectTechArray);
    } catch (err) {
      console.log(err);
    }
  }

  // displayCreateModal = () => {
  //   this.createModalState="modal modal-active";
  // };

  // displayUpdateModal = () => {
  //   try {

  //     for (let i = 0; i < this.projectThumbnails.length; i++) {
  //       if (this.projectThumbnails[i][this.currentTitle] !== undefined) {
  //         this.currentThumbnails = this.projectThumbnails[i][this.currentTitle];
  //         break;
  //       } else {
  //        this.currentThumbnails = [];
  //       }
  //     }

  //     for (let i = 0; i < this.tech.length; i++) {
  //       if (this.tech[i][this.currentTitle] !== undefined) {
  //         this.currentTech = this.tech[i][this.currentTitle]
  //         break;
  //       } else {
  //         this.currentTech = [];
  //       }
  //     };

  //     this.updateModalState="modal modal-active";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // displayDeleteModal = async () => {
  //   try {
  //     this.deletedProject = this.currentTitle;
  //     this.deleteModalState="modal modal-active";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // displayFilter = async () => {
  //   try {
  //     if (this.filterButtons === "skill-buttons") {
  //       this.filterButtons = "skill-buttons skill-buttons-view";
  //     } else {
  //       this.filterButtons = "skill-buttons";
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // filterProjects = async () => {
  //   try {
  //     const techProjects = [];
  //     for (let i = 0; i < this.tech.length; i++) {
  //       const projectsTech = this.tech[i][Object.keys(this.tech[i])][0];
  //       for (let j = 0; j < projectsTech.length; j++) {
  //         if (projectsTech[j] === this.tech) {
  //           techProjects.push(Object.keys(this.tech[i])[0]);
  //         }
  //       }
  //     }

  //     const filteredThumbnailsArray: ArrayType[] = [];
  //     for (let i = 0; i < techProjects.length; i++) {
  //       for (let j = 0; j < this.projectThumbnails.length; j++) {
  //         if (techProjects[i] === this.projectThumbnails[j].project) {
  //           filteredThumbnailsArray.push(this.projectThumbnails[j]);
  //         }
  //       }
  //     }
  //     this.filteredThumbnails.push(filteredThumbnailsArray);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

}
