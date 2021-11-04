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

export class AboutComponent{

  skill = '';
  skills: any[] = [];
  uniqueMarkup: any[] = [];
  uniqueStyle: any[] = [];
  uniqueFrontend: any[] = [];
  uniqueBackend: any[] = [];
  uniqueDatabase: any[] = [];
  uniqueOther: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getSkills()
  }

  ngAfterContentChecked() {
    this.createSkillArrays();
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

  createSkillArrays(){

    let markup: any[] = [];
    let style: any[] = [];
    let frontend: any[] = [];
    let backend: any[] = [];
    let database: any[] = [];
    let other: any[] = [];

    for(let i = 0; i < this.skills.length; i++){
      if(this.skills[i].category === "MARKUP"){
        markup.push(this.skills[i])
      }
      if(this.skills[i].category === "STYLE"){
        style.push(this.skills[i])
      }
      if(this.skills[i].category === "FRONTEND"){
        frontend.push(this.skills[i])
      }
      if(this.skills[i].category === "BACKEND"){
        backend.push(this.skills[i])
      }
      if(this.skills[i].category === "DATABASE"){
        database.push(this.skills[i])
      }
      if(this.skills[i].category === "OTHER"){
        other.push(this.skills[i])
      }
    }
    this.uniqueMarkup = [...new Set(markup)];
    this.uniqueStyle = [...new Set(style)];
    this.uniqueFrontend = [...new Set(frontend)];
    this.uniqueBackend = [...new Set(backend)];
    this.uniqueDatabase = [...new Set(database)];
    this.uniqueOther = [...new Set(other)];
  }

}
