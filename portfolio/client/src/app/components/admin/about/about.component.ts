import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

export interface Root {
  status: string
  results: Result[]
  data: Data
}

export interface Result {
  skill: string
  level: number
  category: string
  icon: string
  ranking: number
}

export interface Data {
  skills: Skill[]
}

export interface Skill {
  skill: string
  level: number
  category: string
  icon: string
  ranking: number
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AdminAboutComponent{

  newSkill = '';
  skills: any[] = [];
  skillModalState = 'modal';

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getSkills()

    // document.addEventListener("mousedown", (event) => {
    //   this.skillModalState = 'modal';
    // });

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

  displaySkillModal = () => {
    this.skillModalState = 'modal modal-active';
  }

}
