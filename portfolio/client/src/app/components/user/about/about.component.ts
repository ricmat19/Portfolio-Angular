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
  skills = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getSkills()
  }

  getSkills(){
    return this.http.get<any>(`http://localhost:3000/skills`).subscribe((res) => {
        this.skills = res;
        console.log(this.skills)
      }, (err) => {
        console.log(err)
      }
    );
  }

    // try {
      // function importAll(icons) {
      //   let images = {};
      //   icons.keys().forEach((icon) => {
      //     images[icon.replace("./", "")] = icons(icon);
      //   });
      //   return images;
      // }
      // const skillIcons = importAll(require.context("../images/skills"));
      //   //Get all skills from DB
      //   const skills = await IndexAPI.get(`/skills`);
      //   const skillArray = [];
      //   for (let i = 0; i < skills.data.results.length; i++) {
      //     skills.data.results[i].iconImage =
      //       skillIcons[skills.data.results[i].icon];
      //     skillArray.push(skills.data.results[i]);
      //   }
      //   skillArray.sort(function (a, b) {
      //     return a.ranking - b.ranking;
      //   });
      //   setSkills(skillArray);
//       } catch (err) {
//         console.log(err);
//       }

//   }
}
