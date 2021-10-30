import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

export interface Root {
  status: string
  results: Result[][]
  data: Data
}

export interface Result {
  id: number
  project: string
  technology: string
  thumbnail: string
  primary_image?: number
}

export interface Data {
  skills: Skill[][]
}

export interface Skill {
  id: number
  project: string
  technology: string
  thumbnail: string
  primary_image?: number
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})

export class AdminPortfolioComponent implements OnInit{

  createModalState = 'modal';
  updateModalState = 'modal';
  deleteModalState = 'modal';

  createdProject = '';
  updatedProject = '';
  deletedProject = '';

  projects: any[] = [];
  projectSkills: any[] = [];
  skills: any[] = [];


  titlesArray = [];
  allThumbnailsArray = [];
  projectThumbnailsArray = [];
  techArray = [];
  skillsArray = [];

  filterButtons = 'skill-buttons';
  filteredThumbnails: any[] = [];

  currentTitle = '';
  currentThumbnailsArray = [];
  currentTechArray = [];

  tempObject = {};

  constructor(private http: HttpClient){}

  ngOnInit(){

    this.getProjects()
    this.getSkills()

    // console.log(filteredProjectThumbnailArray)
    // this.allThumbnailsArray.push(filteredProjectThumbnailArray);


  }

  ngAfterContentChecked(){

    // document.addEventListener("mousedown", (event) => {
    //   if (
    //     createRef.current !== null &&
    //     updateRef.current !== null &&
    //     deleteRef !== null
    //   ) {
    //     if (!createRef.current.contains(event.target)) {
    //       this.createModalState = "modal";
    //     }
    //     if (!updateRef.current.contains(event.target)) {
    //       this.updateModalState = "modal";
    //     }
    //     if (!deleteRef.current.contains(event.target)) {
    //       this.deleteModalState = "modal";
    //     }
    // }

    //Filters out duplicate project thumbnail objects
    let exists = false;
    const filteredProjectThumbnailArray = [];
    for (let i = 0; i < this.projects[0].length; i++) {
      if (filteredProjectThumbnailArray.length > 0) {
        for (let j = 0; j < filteredProjectThumbnailArray.length; j++) {
          if (
            this.projects[0][i].project ===
            filteredProjectThumbnailArray[j].project
          ) {
            exists = true;
          }
        }
        if (exists === false) {
          filteredProjectThumbnailArray.push(
            this.projects[0][i]
          );
        }
      } else {
        filteredProjectThumbnailArray.push(this.projects[0][i]);
      }
      exists = false;
    }
    this.filteredThumbnails = filteredProjectThumbnailArray;

    const projectNames: any[] = [];
    for (let i = 0; i < this.projects[1].length; i++) {
      if(projectNames.indexOf(this.projects[1][i].project) === -1){
        projectNames.push(this.projects[1][i].project)
      }
    }

    const projectTech: any[] = [];
    let newProjectTech: any = {};
    for (let i = 0; i < projectNames.length; i++) {
      const tempArray: any[] = [];
      for (let j = 0; j < this.projects[1].length; j++) {
        if (projectNames[i] === this.projects[1][j].project) {
          tempArray.push(this.projects[1][j].technology)
        }
      }
      projectTech.push(tempArray)

      Object.keys(projectTech).forEach(function(){
          let value = projectTech[i];
          let key = projectNames[i];
          newProjectTech[key] = value;
      });

    }

    this.projectSkills = newProjectTech;
    console.log(this.projectSkills)
  }


  getProjects(){
    return this.http.get<any>(`http://localhost:3000/projects`).subscribe((res) => {
        this.projects = res.results;
        console.log(res.results)
      }, (err) => {
        console.log(err)
      }
    );
  }

  getSkills(){
    return this.http.get<any>(`http://localhost:3000/skills`).subscribe((res) => {
        this.skills = res.results;
        console.log(this.skills)
      }, (err) => {
        console.log(err)
      }
    );
  }

  filterProjects(){
    try {

        // const filteredThumbnailsArray: ArrayType[] = [];
        // for (let i = 0; i < techProjects.length; i++) {
        //   for (let j = 0; j < this.projectThumbnails.length; j++) {
        //     if (techProjects[i] === this.projectThumbnails[j].project) {
        //       filteredThumbnailsArray.push(this.projectThumbnails[j]);
        //     }
        //   }
        // }
        // this.filteredThumbnails.push(filteredThumbnailsArray);
      } catch (err) {
        console.log(err);
      }
    };

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
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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

}
