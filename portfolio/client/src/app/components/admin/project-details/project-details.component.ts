//Project Details Display

import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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
  title = this.route.snapshot.paramMap.get('project')?.toLowerCase();
  //Fix: Add Github URL to DB
  githubLink = "https://github.com/ricmat19/" + this.route.snapshot.paramMap.get('project')?.toLowerCase();
  thumbnails = [];
  thumbnailIndex = 0;
  tech = [];

  constructor(private http: HttpClient, private route: ActivatedRoute){}

  ngOnInit(){
      this.getProject(this.title);
  }

  ngAfterContentChecked() {
    this.getProjectDetails();
  }

  getProject(title: any){
    return this.http.get<any>(`http://localhost:3000/portfolio/${title}`).subscribe((res) => {
        this.project = res.results;
      }, (err) => {
        console.log(err)
      }
    );
  }

  slideThumbnailLeft = async () => {
    try {
      if (this.thumbnailIndex === 0) {
        this.thumbnails.length - 1;
      } else {
        let newThumbnail = this.thumbnailIndex - 1;
        this.thumbnailIndex = newThumbnail;
      }
    } catch (err) {
      console.log(err);
    }
    console.log(this.title)
  };

  slideThumbnailRight = async () => {
    try {
      if (this.thumbnailIndex === this.thumbnails.length - 1) {
        this.thumbnailIndex = 0;
      } else {
        let newThumbnail = this.thumbnailIndex + 1;
        this.thumbnailIndex = newThumbnail;
      }
    } catch (err) {
      console.log(err);
    }
  };

  getProjectDetails(){
    const projectThumbnailsArray = [];
    console.log(this.project)
    //Loops through the array of images associated with this project
    // for (let i = 0; i < this.project[0].length; i++) {
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

  }


