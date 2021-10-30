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

  projectNames: any[] = [];
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

    this.getProjectSet();
    this.getAllProjects();
  }

  getProjectSet(){
    let exists = false;
    const uniqueProjects = [];
    if(this.projects[0] !== undefined){
      for (let i = 0; i < this.projects[0].length; i++) {
        if (uniqueProjects.length > 0) {
          for (let j = 0; j < uniqueProjects.length; j++) {
            if (
              this.projects[0][i].project ===
              uniqueProjects[j].project
            ) {
              exists = true;
            }
          }
          if (exists === false) {
            uniqueProjects.push(
              this.projects[0][i]
            );
          }
        } else {
          uniqueProjects.push(this.projects[0][i]);
        }
        exists = false;
      }
    }
    this.filteredThumbnails = uniqueProjects;
  }

  getAllProjects(){
    const projectNames: any[] = [];
    if(this.projects[1] !== undefined){
      for (let i = 0; i < this.projects[1].length; i++) {
        if(projectNames.indexOf(this.projects[1][i].project) === -1){
          projectNames.push(this.projects[1][i].project)
        }
      }
    }
    this.projectNames = projectNames;
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
  }

  filterProjects(skill: any){

    const filteredNames: any[] = [];
    for (let i = 0; i < this.projectNames.length; i++) {
      if(this.projects[1] !== undefined){
        for (let j = 0; j < this.projects[1].length; j++) {
          if (this.projects[1][j].technology === skill && filteredNames.indexOf(this.projects[1][j].project) === -1) {
            filteredNames.push(this.projects[1][j].project)
          }
        }
      }

      const tempProjectsArray: any[] = [];
      if(this.projects[1] !== undefined){
        for (let i = 0; i < this.projects[1].length; i++) {
          for (let j = 0; j < filteredNames.length; j++) {
            if (filteredNames[j] === this.projects[1][i].project) {
              tempProjectsArray.push(this.projects[1][i])
            }
          }
        }
      }
      // this.projects = tempProjectsArray
      console.log(tempProjectsArray)

    };
  }

      // const primaryThumbnailArray = [];
      // for (let i = 0; i < uniqueProjects.length; i++) {
      //   for (
      //     let j = 0;
      //     j <
      //     uniqueProjects[i][
      //       Object.keys(uniqueProjects[i])[0]
      //     ][0].length;
      //     j++
      //   ) {
      //     if (
      //       uniqueProjects[i][
      //         Object.keys(uniqueProjects[i])[0]
      //       ][0][j].primary_image === 1
      //     ) {
      //       primaryThumbnailArray.push(
      //         uniqueProjects[i][
      //           Object.keys(uniqueProjects[i])[0]
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

  displayCreateModal = () => {
    this.createModalState="modal modal-active";
  };

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

  displayFilter = async () => {
    try {
      if (this.filterButtons === "skill-buttons") {
        this.filterButtons = "skill-buttons skill-buttons-view";
      } else {
        this.filterButtons = "skill-buttons";
      }
    } catch (err) {
      console.log(err);
    }
  };

}
