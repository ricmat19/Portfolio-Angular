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
  technology?: string
  thumbnail?: string
  primary_image?: number
}

export interface Data {
  project: Project[][]
}

export interface Project {
  id: number
  project: string
  technology?: string
  thumbnail?: string
  primary_image?: number
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})

export class AdminProjectDetailsComponent{

  project: any[] = [];
  title = this.route.snapshot.paramMap.get('project')?.toLowerCase();
  //Fix: Add Github URL to DB
  githubLink = "https://github.com/ricmat19/" + this.route.snapshot.paramMap.get('project')?.toLowerCase();
  thumbnails: any[] = [];
  thumbnailIndex = 0;
  tech: any[] = [];

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
        this.thumbnailIndex = this.thumbnails.length - 1;
      } else {
        this.thumbnailIndex = this.thumbnailIndex - 1;
      }
    } catch (err) {
      console.log(err);
    }
  };

  slideThumbnailRight = async () => {
    try {
      if (this.thumbnailIndex === this.thumbnails.length - 1) {
        this.thumbnailIndex = 0;
      } else {
        this.thumbnailIndex = this.thumbnailIndex + 1;
      }
    } catch (err) {
      console.log(err);
    }
  };

  getProjectDetails(){
    //Loops through the array of images associated with this project
    for (let i = 0; i < this.project[1].length; i++) {
      this.thumbnails.push(this.project[1][i].thumbnail)
    }
    this.thumbnails = [...new Set(this.thumbnails)];

    // //Loops through the array of technology associated with this project
    for (let i = 0; i < this.project[0].length; i++) {
      this.tech.push(this.project[0][i].technology)
    }
    this.tech = [...new Set(this.tech)];
  }

  }


