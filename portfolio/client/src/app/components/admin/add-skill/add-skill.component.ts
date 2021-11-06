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
  skillInput = '';
  categorySelection = '';
  rankSelection = '';
  levelSelection = '';
  iconSelection = '';
  newSkill = '';
  icons: any;

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.getIcons();
  }

  getIcons(){
    this.http.get('http://localhost:3000/icons').subscribe(
      (res) => {
        this.icons = res;
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
