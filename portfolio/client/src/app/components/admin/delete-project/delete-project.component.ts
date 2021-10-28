
import { Component } from "@angular/core";
// import IndexAPI from "../../../../apis/indexAPI";

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html'
})

export class AdminDeleteProjectComponent{

  title = '';

  constructor(){
    try {
      this.title;
    } catch (err) {
      console.log(err);
    }
  }

  // deleteProject = async (title) => {
  //   try {
  //     await IndexAPI.delete(`/admin/portfolio/${title}/delete`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

}
