import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

export interface Project {
  project: string,
  thumbnails: string,
  primaryImage: string,
  projectTech: string,
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html'
})

export class AdminAddProjectComponent{

  images: any[] = [];
  skills: any[] = [];

  projects: any[] = [];
  projectImages: any[] = [];
  projectSkills: any[] = [];

  project = {}
  projectTitle = '';
  currentProjectImages: any[] = [];
  skillInput = '';

  imageChecked = false;
  skillChecked = false;

  titleInput = '';
  thumbnails = [];
  primaryImage = '';
  projectTech = [];

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.getProjects();
    this.getSkills();
    this.getImages();
  }

  getProjects() {
    return this.http.get<any>(`http://localhost:3000/projects`).subscribe(
      (res) => {
        this.projects = res.results;
        for(let i = 0; i < this.projects[0].length; i++){
          this.projectImages.push(this.projects[0][i]);
        }
        for(let i = 0; i < this.projects[1].length; i++){
          this.projectSkills.push(this.projects[1][i]);
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getImages(){
    return this.http.get<any>(`http://localhost:3000/images`).subscribe(
      (res) => {

      },
      (err) => {
        console.log(err);
      }
    );
  }

  addProject(projectTitle: any, projectImages: any, primaryImage: any, projectSkills: any){
    return this.http.post(`http://localhost:3000/projects/add-project`, {projectTitle, projectImages, primaryImage, projectSkills}).subscribe((res) => {
        this.project = res;
      }, (err) => {
        console.log(err)
      }
    );
  }

  projectSkillSet = async (skill: HTMLTextAreaElement, e: any) => {
    try {

      const currentSkills: any[] = this.projectSkills;
      if (e.target.checked) {
        currentSkills.push(skill)
      }else if (!e.target.checked) {
        const index = currentSkills.indexOf(skill);
        currentSkills.splice(index, 1);
      }
      this.projectSkills = currentSkills;

    } catch (err) {
      console.log(err);
    }
  };

  projectImageSet = async (image: HTMLTextAreaElement, e: any) => {
    try {

      const currentImages: any[] = this.projectImages;
      if (e.target.checked) {
        currentImages.push(image)
      }else if (!e.target.checked) {
        const index = currentImages.indexOf(image);
        currentImages.splice(index, 1);
      }
      this.projectImages = currentImages;

    } catch (err) {
      console.log(err);
    }
  };

  setPrimaryImage = async (image: string) => {
    try {

      this.primaryImage = image

    } catch (err) {
      console.log(err);
    }
  };

}
