import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

export interface Skill {
  category: string,
  skill: string,
  level: number,
  icon: string,
  ranking: number,
}

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html'
})

export class AdminAddSkillComponent implements OnInit{

  skillsObject = {};
  skills: any[] = [];
  icons: any[] = [];
  skillInput = '';
  categorySelection = '';
  rankSelection = '';
  levelSelection = '';
  iconSelection = '';
  newSkill = '';

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.getIcons();
  }

  getIcons(){
    return this.http.get<any>(`http://localhost:3000/skills`).subscribe((res) => {
        this.skills = res.results;
        for(let i = 0; i < this.skills.length; i++){
          this.icons.push(this.skills[i].icon)
        }
      }, (err) => {
        console.log(err)
      }
    );
  }

  addSkill(category: any, skill: any, level: any, icon: any, ranking: any){
    return this.http.post(`http://localhost:3000/skill/add-skill`, {category, skill, level, icon, ranking}).subscribe((res) => {
        this.skillsObject = res;
      }, (err) => {
        console.log(err)
      }
    );
  }



}
