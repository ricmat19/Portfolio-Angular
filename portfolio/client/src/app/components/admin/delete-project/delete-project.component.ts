
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// import IndexAPI from "../../../../apis/indexAPI";

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html'
})

export class AdminDeleteProjectComponent{

  title = '';

  constructor(private http: HttpClient){}

  // deleteProject(title: any){
  //   return this.http.delete(`http://localhost:3000/admin/portfolio/${title}/delete`).subscribe((res) => {
  //     }, (err) => {
  //       console.log(err)
  //     }
  //   );
  // }

}
