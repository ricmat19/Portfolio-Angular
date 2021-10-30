import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// import IndexAPI from "../../../../apis/indexAPI";
// import HeaderC from "../../standard/header/header.component";
// import FooterC from "../../standard/footer/footer.component";

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

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getSkills()
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

}
