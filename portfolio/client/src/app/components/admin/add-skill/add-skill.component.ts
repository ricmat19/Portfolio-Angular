import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
// import IndexAPI from "../../../../apis/indexAPI";

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

export class AdminAddSkillComponent{

  skills = {};
  icons = [];
  skillInput = '';
  categorySelection = '';
  rankSelection = '';
  levelSelection = '';
  iconSelection = '';
  newSkill = '';

  constructor(private http: HttpClient){}

  // ngOnInit(){
  //   this.addSkill(this.categorySelection, this.skillInput, this.levelSelection, this.iconSelection, this.rankSelection)
  // }

  // addSkill(category: any, skill: any, level: any, icon: any, ranking: any){
  //   return this.http.post(`http://localhost:3000/skill/add-skill`, [category, skill, level, icon, ranking]).subscribe((res) => {
  //       this.skills = res;
  //       console.log(this.skills)
  //     }, (err) => {
  //       console.log(err)
  //     }
  //   );
  // }

  //   try {

  //     let iconSet = [];
  //     function importAll(icons) {
  //       let images = {};
  //       icons.keys().forEach((index) => {
  //         images[index.replace("./", "")] = icons(index);
  //         Object.keys(images).forEach((key) => {
  //           iconSet.push(key);
  //           setIcons([...new Set(iconSet)]);
  //         });
  //       });
  //     }

  //     importAll(require.context("../../images/skills"));

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // addSkill = async () => {
  //   try {
  //     await IndexAPI.post("/skill/add-skill", {
  //       skill: this.skillInput,
  //       category: this.categorySelection,
  //       rank: this.rankSelection,
  //       level: this.levelSelection,
  //       icon: this.iconSelection,
  //     });

  //     this.skillInput = "";

  //     props.setNewSkill(newSkill);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

}
