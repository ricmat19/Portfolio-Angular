import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
export class PortfolioComponent implements OnInit {
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getProjects();
    this.getSkills();
  }

  getProjects() {
    return this.http.get<any>(`http://localhost:3000/projects`).subscribe(
      (res) => {
        this.projects = res.results;
        for (let i = 0; i < this.projects[0].length; i++) {
          this.allProjects.push(this.projects[0][i]);
          this.currentProjects.push(this.projects[0][i]);
        }
        for (let i = 0; i < this.projects[1].length; i++) {
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

  displayProjectDetails(title: any) {
    this.router.navigate(['/portfolio', title]);
  }
}
