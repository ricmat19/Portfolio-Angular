import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

export interface Root {
  status: string;
  results: Result[][];
  data: Data;
}

export interface Result {
  id: number;
  project: string;
  technology: string;
  thumbnail: string;
  primary_image?: number;
}

export interface Data {
  skills: Skill[][];
}

export interface Skill {
  id: number;
  project: string;
  technology: string;
  thumbnail: string;
  primary_image?: number;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
})
export class AdminPortfolioComponent implements OnInit {

  @ViewChild('createDiv') createRef !: ElementRef;
  @ViewChild('createButton') createButtonRef !: ElementRef;
  @ViewChild('updateDiv') updateRef !: ElementRef;
  @ViewChild('updateButton') updateButtonRef !: ElementRef;
  @ViewChild('deleteDiv') deleteRef !: ElementRef;
  @ViewChild('deleteButton') deleteButtonRef !: ElementRef;

  createModalState = 'modal';
  updateModalState = 'modal';
  deleteModalState = 'modal';

  deletedProject = '';

  projectNames: any[] = [];
  projects: any[] = [];
  allProjects: any[] = [];
  currentProjects: any[] = [];
  projectSkills: any[] = [];
  skills: any[] = [];
  allSkills: any[] = [];
  currentSkills: any[] = [];

  filterButtons = 'skill-buttons';

  currentTitle = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProjects();
    this.getSkills();
  }

  @HostListener('document:click', ['$event.target'])
  clickOutside(event: Event){
    // if(this.createRef !== undefined && this.updateRef !== undefined && this.deleteRef !== undefined){
      if (!this.createRef.nativeElement.contains(event) && !this.createButtonRef.nativeElement.contains(event)) {
        this.createModalState = "modal";
      }
      console.log(this.updateButtonRef)
      // console.log(this.deleteButtonRef)
      // if (!this.updateRef.nativeElement.contains(event) && !this.updateButtonRef.nativeElement.contains(event)) {
      //   this.updateModalState = "modal";
      // }
      // if (!this.deleteRef.nativeElement.contains(event) && !this.deleteButtonRef.nativeElement.contains(event)) {
      //   this.deleteModalState = "modal";
      // }
    // }
  }

  getProjects() {
    return this.http.get<any>(`http://localhost:3000/projects`).subscribe(
      (res) => {
        this.projects = res.results;
        for(let i = 0; i < this.projects[0].length; i++){
          this.allProjects.push(this.projects[0][i]);
          this.currentProjects.push(this.projects[0][i]);
        }
        for(let i = 0; i < this.projects[1].length; i++){
          this.allSkills.push(this.projects[1][i]);
          this.currentSkills.push(this.projects[1][i]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSkills() {
    return this.http.get<any>(`http://localhost:3000/skills`).subscribe(
      (res) => {
        this.skills = res.results;
        console.log(this.skills);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterContentChecked() {
    this.getProjectSet();
    this.getSkillSet();
  }

  //Get list of unique projects with their primary thumbnail
  getProjectSet() {
    let exists = false;
    const uniqueProjects = [];
    if (this.currentProjects !== undefined) {
      for (let i = 0; i < this.currentProjects.length; i++) {
        if (uniqueProjects.length > 0) {
          for (let j = 0; j < uniqueProjects.length; j++) {
            if (this.currentProjects[i].project === uniqueProjects[j].project) {
              exists = true;
            }
          }
          if (exists === false && this.currentProjects[i].primary_image === 1) {
            uniqueProjects.push(this.currentProjects[i]);
          }
        } else {
          uniqueProjects.push(this.currentProjects[i]);
        }
        exists = false;
      }
    }
    this.currentProjects = uniqueProjects;
  }

  //Get list of all projects with their technologies
  getSkillSet() {
    const projectNames: any[] = [];
    if (this.currentSkills !== undefined) {
      for (let i = 0; i < this.currentSkills.length; i++) {
        if (projectNames.indexOf(this.currentSkills[i].project) === -1) {
          projectNames.push(this.currentSkills[i].project);
        }
      }
    }
    this.projectNames = projectNames;
    const projectTech: any[] = [];
    let newProjectTech: any = {};
    for (let i = 0; i < projectNames.length; i++) {
      const tempArray: any[] = [];
      for (let j = 0; j < this.currentSkills.length; j++) {
        if (projectNames[i] === this.currentSkills[j].project) {
          tempArray.push(this.currentSkills[j].technology);
        }
      }
      projectTech.push(tempArray);

      Object.keys(projectTech).forEach(function () {
        let value = projectTech[i];
        let key = projectNames[i];
        newProjectTech[key] = value;
      });
    }
    this.projectSkills = newProjectTech;
  }

  filterProjects(skill: any) {
    this.currentProjects = this.allProjects;
    const filteredNames: any[] = [];
    for (let i = 0; i < this.projectNames.length; i++) {
      if (this.currentSkills !== undefined) {
        for (let j = 0; j < this.currentSkills.length; j++) {
          if (
            this.currentSkills[j].technology === skill &&
            filteredNames.indexOf(this.currentSkills[j].project) === -1
          ) {
            filteredNames.push(this.currentSkills[j].project);
          }
        }
      }

      const projectThumbnailsArray: any[] = [];
      if (this.currentProjects[0] !== undefined) {
        for (let i = 0; i < filteredNames.length; i++) {
          for (let k = 0; k < this.currentProjects.length; k++) {
            if (filteredNames[i] === this.currentProjects[k].project) {
              projectThumbnailsArray.push(this.currentProjects[k]);
            }
          }
        }
      }

      this.currentProjects = projectThumbnailsArray;
    }
  }

  displayFilters = async () => {
    try {
      if (this.filterButtons === 'skill-buttons') {
        this.filterButtons = 'skill-buttons skill-buttons-view';
      } else {
        this.filterButtons = 'skill-buttons';
      }
    } catch (err) {
      console.log(err);
    }
  };

  displayCreateModal = () => {
    this.createModalState = 'modal modal-active';
  };

  displayUpdateModal = () => {
    try {

      this.updateModalState="modal modal-active";

      console.log(this.projectNames);
      console.log(this.projects);
      console.log(this.allProjects);
      console.log(this.currentProjects);
      console.log(this.projectSkills);
      console.log(this.skills);
      console.log(this.allSkills);
      console.log(this.currentSkills);

      // for (let i = 0; i < this.allProjects.length; i++) {
      //   if (this.allProjects[i] !== undefined) {
      //     this.currentProjects = this.currentProjects[i][this.currentTitle];
      //     break;
      //   } else {
      //    this.currentProjects = [];
      //   }
      // }

      // for (let i = 0; i < this.currentSkills.length; i++) {
      //   if (this.currentSkills[i][this.currentTitle] !== undefined) {
      //     this.currentSkills = this.currentSkills[i][this.currentTitle]
      //     break;
      //   } else {
      //     this.currentSkills = [];
      //   }
      // };
    } catch (err) {
      console.log(err);
    }
  };

  displayDeleteModal(deletedProject: any){
    try {
      this.deletedProject = deletedProject
      this.deleteModalState="modal modal-active";
    } catch (err) {
      console.log(err);
    }
  };
}

