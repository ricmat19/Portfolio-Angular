import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) {}

  addProject(project: any, thumbnails: any, primaryImage: any, projectTech: any){
    return this.http.post(`http://localhost:3000/projects/add-project`, [project, thumbnails, primaryImage, projectTech])
  }

  // updateProject(title: any, projectFiles: any, primaryImage: any, projectSkills: any, oldTitle: any){
  //   return this.http.push(`http://localhost:3000/projects/update-project`, [title, projectFiles, primaryImage, projectSkills, oldTitle])
  // }

  deleteProject(title: any){
    return this.http.delete(`http://localhost:3000/admin/portfolio/${title}/delete`)
  }

  getProject(project: any){
    return this.http.get<any>(`http://localhost:3000/portfolio/${project}`)
  }

}
