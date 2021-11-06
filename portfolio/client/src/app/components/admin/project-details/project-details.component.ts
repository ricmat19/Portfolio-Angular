//Project Details Display

import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

export interface Root {
  status: string
  results: Result[][]
  data: Data
}

export interface Result {
  id: number
  project: string
  thumbnail: string
  primary_image: number
  technology: string
}

export interface Data {
  project: Project[][]
}

export interface Project {
  id: number
  project: string
  thumbnail: string
  primary_image: number
  technology: string
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})

export class AdminProjectDetailsComponent{

  project = {};
  title = '';
  githubLink = '';
  thumbnails = [];
  thumbnailIndex = 0;
  tech = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
      this.getProject(this.title)
  }

  getProject(title: any){
    return this.http.get<any>(`http://localhost:3000/portfolio/${title}`).subscribe((res) => {
        this.project = res;
        console.log(this.project)
      }, (err) => {
        console.log(err)
      }
    );
  }

      // function importAll(projects) {
      //   let images = {};
      //   projects.keys().forEach((index) => {
      //     images[index.replace("./", "")] = projects(index);
      //   });
      //   return images;
      // }

      // importAll(require.context("../../images/projects"));

      // setTitle(parameters.project.toLowerCase());

      // //Fix: Add Github URL to DB
      // setGithubLink(`https://github.com/ricmat19/${parameters.project}`);

      // //Get project from DB
      // const project = await IndexAPI.get(`/portfolio/${parameters.project}`);

      // const projectThumbnailsArray = [];
      // //Loops through the array of images associated with this project
      // for (let i = 0; i < project.data.results[1].length; i++) {
      //   //Gets the file name of the current project image
      //   const projectFile = project.data.results[1][i].thumbnail;

      //   //Loops through the array of imported images
      //   for (let j = 0; j < Object.keys(projectThumbnails).length; j++) {
      //     if (Object.keys(projectThumbnails)[j] === projectFile) {
      //       projectThumbnailsArray.push(projectThumbnails[projectFile]);
      //     }
      //   }
      // }
      // setThumbnails(projectThumbnailsArray);
      // console.log(projectThumbnailsArray);

      // const projectTechArray = [];
      // //Loops through the array of technology associated with this project
      // for (let i = 0; i < project.data.results[0].length; i++) {
      //   projectTechArray.push(project.data.results[0][i].technology);
      // }
      // setTechs(projectTechArray);
  }

  // slideThumbnailLeft = async () => {
  //   try {
  //     if (this.thumbnailIndex === 0) {
  //       this.thumbnails.length - 1;
  //     } else {
  //       let newThumbnail = this.thumbnailIndex - 1;
  //       this.thumbnailIndex = newThumbnail;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // slideThumbnailRight = async () => {
  //   try {
  //     if (this.thumbnailIndex === this.thumbnails.length - 1) {
  //       this.thumbnailIndex = 0;
  //     } else {
  //       let newThumbnail = this.thumbnailIndex + 1;
  //       this.thumbnailIndex = newThumbnail;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
